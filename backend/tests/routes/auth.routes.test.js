// tests/routes/auth.routes.test.js
const request = require("supertest");
const { connect, disconnect, clearDB } = require("../helpers/db");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.JWT_EXPIRE = "1h";
process.env.NODE_ENV = "test";

// We need to build a minimal Express app with the auth routes
// instead of importing the full app (which calls connectDB)
const express = require("express");
const authRoutes = require("../../src/routes/authRoutes");
const errorHandler = require("../../src/middlewares/errorHandler");

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/auth", authRoutes);
  app.use(errorHandler);
  return app;
};

let app;

beforeAll(async () => {
  await connect();
  app = createApp();
});
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

describe("Auth Routes — Integration", () => {
  const validUser = {
    name: "Route Test",
    email: "route@test.com",
    password: "Str0ng!Pass1",
  };

  describe("POST /api/v1/auth/register", () => {
    it("should register and return 201 with token", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(validUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data.user.email).toBe("route@test.com");
    });

    it("should return 409 for duplicate email", async () => {
      await request(app).post("/api/v1/auth/register").send(validUser);
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(validUser);

      expect(res.status).toBe(409);
    });

    it("should return 400 for invalid body", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ email: "bad" });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/v1/auth/register").send(validUser);
    });

    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: validUser.email, password: validUser.password });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("token");
    });

    it("should return 401 for wrong password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: validUser.email, password: "WrongPass!1" });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/v1/auth/profile", () => {
    it("should return 401 without token", async () => {
      const res = await request(app).get("/api/v1/auth/profile");
      expect(res.status).toBe(401);
    });

    it("should return profile with valid token", async () => {
      const regRes = await request(app)
        .post("/api/v1/auth/register")
        .send(validUser);
      const token = regRes.body.data.token;

      const res = await request(app)
        .get("/api/v1/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.user.email).toBe("route@test.com");
    });
  });
});
