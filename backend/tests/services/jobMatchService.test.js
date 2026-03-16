// tests/services/jobMatchService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");
const mongoose = require("mongoose");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";

const Job = require("../../src/models/job.model");
const User = require("../../src/models/user.model");
const JobMatch = require("../../src/models/job_match.model");
const jobMatchService = require("../../src/services/jobMatchService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

describe("jobMatchService", () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      name: "Matcher",
      email: "matcher@test.com",
      password: "Str0ng!Pass",
    });
  });

  describe("listJobMatches", () => {
    it("should return empty list when no matches", async () => {
      const result = await jobMatchService.listJobMatches(user._id, {
        page: 1,
        limit: 10,
      });
      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(0);
    });

    it("should return paginated matches", async () => {
      const job = await Job.create({
        title: "Dev",
        description: "Build",
        requirements: "2yr",
        company: { name: "Corp" },
        location: { country: "India" },
        jobType: "Full-Time",
        experienceLevel: "Mid",
        applicationMethod: "Platform",
        source: { platform: "HustleAI" },
      });

      await JobMatch.create([
        {
          userId: user._id,
          jobId: job._id,
          matchScore: 85,
          status: "New",
          isActive: true,
        },
        {
          userId: user._id,
          jobId: job._id,
          matchScore: 70,
          status: "New",
          isActive: true,
        },
      ]);

      const result = await jobMatchService.listJobMatches(user._id, {
        page: 1,
        limit: 10,
      });
      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(2);
    });
  });

  describe("refreshJobMatches", () => {
    it("should create new matches for active jobs", async () => {
      await Job.create({
        title: "Role 1",
        description: "D",
        requirements: "R",
        company: { name: "C" },
        location: { country: "India" },
        jobType: "Full-Time",
        experienceLevel: "Mid",
        applicationMethod: "Platform",
        source: { platform: "HustleAI" },
        isActive: true,
      });

      const result = await jobMatchService.refreshJobMatches(user._id);
      expect(result).toHaveProperty("summary");
      expect(result.summary.total).toBeGreaterThanOrEqual(1);
      expect(result).toHaveProperty("matches");
    });

    it("should throw 404 for non-existent user", async () => {
      await expect(
        jobMatchService.refreshJobMatches(new mongoose.Types.ObjectId()),
      ).rejects.toMatchObject({ statusCode: 404 });
    });

    it("should archive old matches on refresh", async () => {
      const job = await Job.create({
        title: "Role",
        description: "D",
        requirements: "R",
        company: { name: "C" },
        location: { country: "India" },
        jobType: "Full-Time",
        experienceLevel: "Mid",
        applicationMethod: "Platform",
        source: { platform: "HustleAI" },
        isActive: true,
      });

      await JobMatch.create({
        userId: user._id,
        jobId: job._id,
        matchScore: 50,
        status: "New",
        isActive: true,
      });

      await jobMatchService.refreshJobMatches(user._id);

      const archived = await JobMatch.find({
        userId: user._id,
        isActive: false,
      });
      expect(archived.length).toBeGreaterThanOrEqual(1);
    });
  });
});
