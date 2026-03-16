// tests/services/searchService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";

const Job = require("../../src/models/job.model");
const User = require("../../src/models/user.model");
const searchService = require("../../src/services/searchService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

describe("searchService", () => {
  describe("globalSearch", () => {
    it("should throw 400 if query is missing", async () => {
      await expect(
        searchService.globalSearch({ q: "", type: "job" }, "u@test.com"),
      ).rejects.toMatchObject({ statusCode: 400 });
    });

    it("should throw 400 for invalid search type", async () => {
      await expect(
        searchService.globalSearch(
          { q: "test", type: "invalid" },
          "u@test.com",
        ),
      ).rejects.toMatchObject({ statusCode: 400 });
    });

    it("should search jobs by text", async () => {
      await Job.create({
        title: "Node Developer",
        description: "Build APIs",
        requirements: "3 years",
        company: { name: "TestCorp" },
        location: { country: "India" },
        jobType: "Full-Time",
        experienceLevel: "Mid",
        applicationMethod: "Platform",
        source: { platform: "HustleAI" },
      });

      // $text search requires a text index — the model should have one
      const results = await searchService.globalSearch(
        { q: "Node Developer", type: "job", page: 1, limit: 10 },
        "u@test.com",
      );
      expect(Array.isArray(results)).toBe(true);
    });
  });
});
