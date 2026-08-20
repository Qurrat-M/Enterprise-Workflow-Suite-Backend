import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app";
import { db } from "../src/config/db";

const password = "Sports$5";

type AuthFixture = {
  token: string;
  userId: string;
};

const uniqueValue = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

async function createAuthFixture(prefix = "api-test"): Promise<AuthFixture> {
  const email = `${uniqueValue(prefix)}@example.com`;
  const register = await request(app).post("/api/v1/auth/register").send({
    firstName: "API",
    lastName: "Tester",
    email,
    password,
  });
  expect(register.status).toBe(201);

  const login = await request(app).post("/api/v1/auth/login").send({
    email,
    password,
  });
  expect(login.status).toBe(200);

  return {
    token: login.body.data.accessToken,
    userId: register.body.data.id,
  };
}

function authorized(token: string) {
  return { Authorization: `Bearer ${token}` };
}

async function createAuthorizedFixture(): Promise<AuthFixture> {
  const fixture = await createAuthFixture("authorized");
  const role = await db.query(
    "INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING id",
    [uniqueValue("Test Administrator"), "Test role"],
  );
  const permissionNames = ["role.read", "role.update"];
  const permissions = [] as string[];

  for (const name of permissionNames) {
    const [module, action] = name.split(".");
    const permission = await db.query(
      "INSERT INTO permissions (module, action, name) VALUES ($1, $2, $3) RETURNING id",
      [module, action, name],
    );
    permissions.push(permission.rows[0].id);
  }

  for (const permissionId of permissions) {
    await db.query(
      "INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)",
      [role.rows[0].id, permissionId],
    );
  }
  await db.query("INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)", [
    fixture.userId,
    role.rows[0].id,
  ]);

  return fixture;
}

async function createOrganization(token: string) {
  const response = await request(app)
    .post("/api/v1/organizations")
    .set(authorized(token))
    .send({
      name: "Test Organization",
      code: uniqueValue("TESTORG"),
      email: "organization@example.com",
      website: "https://example.com",
      currency: "USD",
    });
  expect(response.status).toBe(201);
  return response.body.data;
}

async function createRole(token: string, name = uniqueValue("Test Role")) {
  const response = await request(app)
    .post("/api/v1/roles")
    .set(authorized(token))
    .send({ name, description: "Role used by integration tests" });
  expect(response.status).toBe(201);
  return response.body.data;
}

async function createPermission(token: string) {
  const module = uniqueValue("TestModule");
  const action = "read";
  const response = await request(app)
    .post("/api/v1/permissions")
    .set(authorized(token))
    .send({ module, action, display_name: "Test permission" });
  expect(response.status).toBe(201);
  return response.body.data;
}

describe("authentication endpoints", () => {
  it("gets the authenticated profile and logs out", async () => {
    const fixture = await createAuthFixture("profile");

    const profile = await request(app)
      .get("/api/v1/auth/me")
      .set(authorized(fixture.token));
    expect(profile.status).toBe(200);
    expect(profile.body.data.id).toBe(fixture.userId);

    const logout = await request(app).post("/api/v1/auth/logout");
    expect(logout.status).toBe(200);
    expect(logout.body.message).toBe("Logout successful");
    expect(logout.headers["set-cookie"]?.[0]).toContain("accessToken=");
  });

  it("rejects invalid authentication payloads and missing credentials", async () => {
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send({ firstName: "A", email: "invalid", password: "short" });
    expect(register.status).toBe(400);

    const login = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "invalid", password: "" });
    expect(login.status).toBe(400);

    const profile = await request(app).get("/api/v1/auth/me");
    expect(profile.status).toBe(401);
  });
});

describe("organization endpoints", () => {
  it("lists, reads, updates, changes status, and deactivates organizations", async () => {
    const fixture = await createAuthFixture("organization");
    const organization = await createOrganization(fixture.token);

    const list = await request(app)
      .get("/api/v1/organizations?page=1&limit=10")
      .set(authorized(fixture.token));
    expect(list.status).toBe(200);
    expect(
      list.body.data.items.some(
        (item: { id: string }) => item.id === organization.id,
      ),
    ).toBe(true);

    const detail = await request(app)
      .get(`/api/v1/organizations/${organization.id}`)
      .set(authorized(fixture.token));
    expect(detail.status).toBe(200);

    const update = await request(app)
      .put(`/api/v1/organizations/${organization.id}`)
      .set(authorized(fixture.token))
      .send({ name: "Updated Organization" });
    expect(update.status).toBe(200);
    expect(update.body.data.name).toBe("Updated Organization");

    const status = await request(app)
      .patch(`/api/v1/organizations/${organization.id}/status`)
      .set(authorized(fixture.token))
      .send({ status: "INACTIVE" });
    expect(status.status).toBe(200);
    expect(status.body.data.status).toBe("INACTIVE");

    const deleted = await request(app)
      .delete(`/api/v1/organizations/${organization.id}`)
      .set(authorized(fixture.token));
    expect(deleted.status).toBe(200);
    expect(deleted.body.message).toBe("Organization deleted successfully");
  });

  it("validates organization input and reports duplicate codes", async () => {
    const fixture = await createAuthFixture("organization-validation");
    const code = uniqueValue("DUPLICATE");
    const payload = { name: "Duplicate Organization", code };

    const first = await request(app)
      .post("/api/v1/organizations")
      .set(authorized(fixture.token))
      .send(payload);
    expect(first.status).toBe(201);

    const duplicate = await request(app)
      .post("/api/v1/organizations")
      .set(authorized(fixture.token))
      .send(payload);
    expect(duplicate.status).toBe(409);

    const invalid = await request(app)
      .post("/api/v1/organizations")
      .set(authorized(fixture.token))
      .send({ name: "", code: "bad code" });
    expect(invalid.status).toBe(400);
  });
});

describe("role endpoints", () => {
  it("lists, reads, creates, updates, and deletes roles", async () => {
    const fixture = await createAuthorizedFixture();
    const role = await createRole(fixture.token);

    const list = await request(app)
      .get("/api/v1/roles?page=1&limit=10")
      .set(authorized(fixture.token));
    expect(list.status).toBe(200);

    const detail = await request(app)
      .get(`/api/v1/roles/${role.id}`)
      .set(authorized(fixture.token));
    expect(detail.status).toBe(200);

    const update = await request(app)
      .put(`/api/v1/roles/${role.id}`)
      .set(authorized(fixture.token))
      .send({ name: uniqueValue("Updated Role"), description: "Updated" });
    expect(update.status).toBe(200);

    const deleted = await request(app)
      .delete(`/api/v1/roles/${role.id}`)
      .set(authorized(fixture.token));
    expect(deleted.status).toBe(200);
    expect(deleted.body.message).toBe("Role deleted successfully");
  });
});

describe("permission endpoints", () => {
  it("lists, reads, creates, updates, and deletes permissions", async () => {
    const fixture = await createAuthFixture("permission");
    const permission = await createPermission(fixture.token);

    const list = await request(app)
      .get("/api/v1/permissions?page=1&limit=10")
      .set(authorized(fixture.token));
    expect(list.status).toBe(200);

    const detail = await request(app)
      .get(`/api/v1/permissions/${permission.id}`)
      .set(authorized(fixture.token));
    expect(detail.status).toBe(200);

    const update = await request(app)
      .put(`/api/v1/permissions/${permission.id}`)
      .set(authorized(fixture.token))
      .send({ module: "UpdatedModule", action: "write" });
    expect(update.status).toBe(200);
    expect(update.body.data.name).toBe("updatedmodule.write");

    const deleted = await request(app)
      .delete(`/api/v1/permissions/${permission.id}`)
      .set(authorized(fixture.token));
    expect(deleted.status).toBe(200);
    expect(deleted.body.message).toBe("Permission deleted successfully");
  });
});

describe("role-permission endpoints", () => {
  it("assigns, reads, and removes role permissions", async () => {
    const fixture = await createAuthorizedFixture();
    const role = await createRole(fixture.token);
    const permission = await createPermission(fixture.token);

    const assigned = await request(app)
      .post(`/api/v1/role-permissions/${role.id}/permissions`)
      .set(authorized(fixture.token))
      .send({ permissionIds: [permission.id] });
    expect(assigned.status).toBe(200);
    expect(assigned.body.data).toHaveLength(1);

    const listed = await request(app)
      .get(`/api/v1/role-permissions/${role.id}/permissions`)
      .set(authorized(fixture.token));
    expect(listed.status).toBe(200);
    expect(listed.body.data[0].id).toBe(permission.id);

    const removed = await request(app)
      .delete(
        `/api/v1/role-permissions/${role.id}/permissions/${permission.id}`,
      )
      .set(authorized(fixture.token));
    expect(removed.status).toBe(200);
  });
});

describe("user and user-role endpoints", () => {
  it("creates, lists, reads, updates, changes status, and deactivates users", async () => {
    const fixture = await createAuthFixture("user");
    const organization = await createOrganization(fixture.token);
    const created = await request(app)
      .post("/api/v1/users")
      .set(authorized(fixture.token))
      .send({
        organization_id: organization.id,
        name: "Managed User",
        email: `${uniqueValue("managed")}@example.com`,
        password,
      });
    expect(created.status).toBe(201);
    expect(created.body.data.password).toBeUndefined();
    const userId = created.body.data.id;

    const list = await request(app)
      .get("/api/v1/users?page=1&limit=10")
      .set(authorized(fixture.token));
    expect(list.status).toBe(200);

    const detail = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set(authorized(fixture.token));
    expect(detail.status).toBe(200);

    const update = await request(app)
      .put(`/api/v1/users/${userId}`)
      .set(authorized(fixture.token))
      .send({ name: "Updated User" });
    expect(update.status).toBe(200);
    expect(update.body.data.name).toBe("Updated User");

    const status = await request(app)
      .patch(`/api/v1/users/${userId}/status`)
      .set(authorized(fixture.token))
      .send({ status: "INACTIVE" });
    expect(status.status).toBe(200);
    expect(status.body.data.status).toBe("INACTIVE");

    const deleted = await request(app)
      .delete(`/api/v1/users/${userId}`)
      .set(authorized(fixture.token));
    expect(deleted.status).toBe(200);
  });

  it("assigns, lists, replaces, and removes user roles", async () => {
    const fixture = await createAuthFixture("user-role");
    const organization = await createOrganization(fixture.token);
    const userResponse = await request(app)
      .post("/api/v1/users")
      .set(authorized(fixture.token))
      .send({
        organization_id: organization.id,
        name: "Role User",
        email: `${uniqueValue("role-user")}@example.com`,
        password,
      });
    const userId = userResponse.body.data.id;
    const role = await createRole(fixture.token);

    const assigned = await request(app)
      .post(`/api/v1/users/${userId}/roles`)
      .set(authorized(fixture.token))
      .send({ roleIds: [role.id] });
    expect(assigned.status).toBe(200);
    expect(assigned.body.data).toHaveLength(1);

    const listed = await request(app)
      .get(`/api/v1/users/${userId}/roles`)
      .set(authorized(fixture.token));
    expect(listed.status).toBe(200);
    expect(listed.body.data[0].id).toBe(role.id);

    const replaced = await request(app)
      .patch(`/api/v1/users/${userId}/roles`)
      .set(authorized(fixture.token))
      .send({ roleIds: [role.id] });
    expect(replaced.status).toBe(200);
    expect(replaced.body.data[0].id).toBe(role.id);

    const removed = await request(app)
      .delete(`/api/v1/users/${userId}/roles/${role.id}`)
      .set(authorized(fixture.token));
    expect(removed.status).toBe(200);
  });
});

describe("protected endpoint behavior", () => {
  it("rejects requests without authentication", async () => {
    const endpoints = [
      ["get", "/api/v1/organizations"],
      ["get", "/api/v1/roles"],
      ["get", "/api/v1/permissions"],
      ["get", "/api/v1/users"],
      [
        "get",
        "/api/v1/role-permissions/00000000-0000-0000-0000-000000000000/permissions",
      ],
      ["get", "/api/v1/users/00000000-0000-0000-0000-000000000000/roles"],
    ] as const;

    for (const [method, path] of endpoints) {
      const response = await request(app)[method](path);
      expect(response.status, `${method.toUpperCase()} ${path}`).toBe(401);
    }
  });
});
