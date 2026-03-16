// tests/routes/jobs.routes.test.js
const request = require("supertest");
const { connect, disconnect, clearDB } = require("../helpers/db");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.JWT_EXPIRE = "1h";
process.env.NODE_ENV = "test";

const express = require("express");
const jobRoutes = require("../../src/routes/jobRoutes");
const authRoutes = require("../../src/routes/authRoutes");
const errorHandler = require("../../src/middlewares/errorHandler");
const User = require("../../src/models/user.model");

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/jobs", jobRoutes);
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

// Helper to register and get token
const getToken = async (role = "user") => {
  const email = `${role}-${Date.now()}@test.com`;
  const res = await request(app)
    .post("/api/v1/auth/register")
    .send({ name: "Test", email, password: "Str0ng!Pass1" });

  if (role === "admin") {
    await User.findOneAndUpdate({ email }, { role: "admin" });
  }

  return res.body.data.token;
};

const sampleJob = {
  title: "Backend Developer",
  description: "Build backend APIs with Node.js and Express",
  requirements: "3+ years of Node.js experience",
  company: {
    name: "TestCorp",
    website: "https://testcorp.example.com",
    size: "51-200",
    industry: "Technology",
  },
  location: {
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    isRemote: false,
    workArrangement: "On-site",
  },
  jobType: "Full-Time",
  experienceLevel: "Mid",
  requiredSkills: [
    { name: "Node.js", importance: "Required", minYearsExperience: 3 },
  ],
  salary: { min: 800000, max: 1500000, currency: "INR", period: "Yearly" },
  applicationMethod: "Platform",
  source: { platform: "HustleAI" },
};

describe("Job Routes — Integration", () => {
  describe("GET /api/v1/jobs", () => {
    it("should return job list (public)", async () => {
      const res = await request(app).get("/api/v1/jobs");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("meta");
    });
  });

  describe("POST /api/v1/jobs", () => {
    it("should return 401 without auth", async () => {
      const res = await request(app).post("/api/v1/jobs").send(sampleJob);

      expect(res.status).toBe(401);
    });

    it("should create job as admin", async () => {
      const token = await getToken("admin");
      const res = await request(app)
        .post("/api/v1/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(sampleJob);

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe("Backend Developer");
    });
  });

  describe("GET /api/v1/jobs/:id", () => {
    it("should return job by id (public)", async () => {
      const token = await getToken("admin");
      const createRes = await request(app)
        .post("/api/v1/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(sampleJob);

      const jobId = createRes.body.data._id;
      const res = await request(app).get(`/api/v1/jobs/${jobId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("Backend Developer");
    });

    it("should return 404 for invalid id", async () => {
      const res = await request(app).get(
        "/api/v1/jobs/000000000000000000000000",
      );
      expect(res.status).toBe(404);
    });
  });

  describe("POST /api/v1/jobs/auto-apply", () => {
    it("should return 401 without auth", async () => {
      const res = await request(app)
        .post("/api/v1/jobs/auto-apply")
        .send({ candidateId: "u1", jobId: "j1" });

      expect(res.status).toBe(401);
    });

    it("should return 202 with valid payload", async () => {
      const token = await getToken();
      const res = await request(app)
        .post("/api/v1/jobs/auto-apply")
        .set("Authorization", `Bearer ${token}`)
        .send({
          candidateId: "aaaaaaaaaaaaaaaaaaaaaaaa",
          jobId: "bbbbbbbbbbbbbbbbbbbbbbbb",
          resumeUrl: "https://example.com/resume.pdf",
        });

      expect(res.status).toBe(202);
      expect(res.body.success).toBe(true);
    });

    it("should return 400 when resumeUrl is missing", async () => {
      const token = await getToken();
      const res = await request(app)
        .post("/api/v1/jobs/auto-apply")
        .set("Authorization", `Bearer ${token}`)
        .send({
          candidateId: "aaaaaaaaaaaaaaaaaaaaaaaa",
          jobId: "bbbbbbbbbbbbbbbbbbbbbbbb",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 when candidateId is not a valid ObjectId", async () => {
      const token = await getToken();
      const res = await request(app)
        .post("/api/v1/jobs/auto-apply")
        .set("Authorization", `Bearer ${token}`)
        .send({
          candidateId: "not-an-objectid",
          jobId: "bbbbbbbbbbbbbbbbbbbbbbbb",
          resumeUrl: "https://example.com/resume.pdf",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("DELETE /api/v1/jobs/:id", () => {
    it("should delete job as admin", async () => {
      const token = await getToken("admin");
      const createRes = await request(app)
        .post("/api/v1/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(sampleJob);

      const jobId = createRes.body.data._id;
      const res = await request(app)
        .delete(`/api/v1/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
