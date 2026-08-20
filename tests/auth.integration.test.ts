import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app";

describe("authentication API", () => {
  const password = "Sports$5";

  it("registers and logs in using a Gmail dot alias", async () => {
    const email = `qurrat.${Date.now()}@gmail.com`;

    const register = await request(app).post("/api/v1/auth/register").send({
      firstName: "Qurratulain",
      lastName: "M",
      email,
      password,
    });

    expect(register.status).toBe(201);
    expect(register.body.success).toBe(true);
    expect(register.body.data.email).toBe(email.replace(".", ""));
    expect(register.body.data.password).toBeUndefined();

    const login = await request(app).post("/api/v1/auth/login").send({
      email,
      password,
    });

    expect(login.status).toBe(200);
    expect(login.body.success).toBe(true);
    expect(login.body.data.accessToken).toEqual(expect.any(String));
    expect(login.headers["set-cookie"]?.[0]).toContain("accessToken=");
  });

  it("rejects an incorrect password", async () => {
    const email = `invalid-password-${Date.now()}@example.com`;
    await request(app).post("/api/v1/auth/register").send({
      firstName: "Test",
      email,
      password,
    });

    const login = await request(app).post("/api/v1/auth/login").send({
      email,
      password: "Incorrect$5",
    });

    expect(login.status).toBe(401);
    expect(login.body.message).toBe("Invalid email or password");
  });
});
