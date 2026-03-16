// tests/services/dashboardService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");
const mongoose = require("mongoose");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";

const User = require("../../src/models/user.model");
const Job = require("../../src/models/job.model");
const Application = require("../../src/models/Application.model");
const JobMatch = require("../../src/models/job_match.model");
const dashboardService = require("../../src/services/dashboardService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

describe("dashboardService", () => {
  let user, job;

  beforeEach(async () => {
    user = await User.create({
      name: "Dashboard User",
      email: "dash@test.com",
      password: "Str0ng!Pass",
    });

    job = await Job.create({
      title: "Backend Dev",
      description: "Build APIs",
      requirements: "3yr Node",
      company: { name: "DashCorp" },
      location: { city: "Mumbai", state: "MH", country: "India" },
      jobType: "Full-Time",
      experienceLevel: "Mid",
      salary: { min: 800000, max: 1500000, currency: "INR", period: "Yearly" },
      applicationMethod: "Platform",
      source: { platform: "HustleAI" },
      isActive: true,
    });
  });

  describe("getDashboardData", () => {
    it("should return empty dashboard for new user", async () => {
      const data = await dashboardService.getDashboardData(user._id);

      expect(data.stats).toEqual({
        jobMatches: 0,
        applicationsSent: 0,
        interviews: 0,
        offers: 0,
      });
      expect(data.applications).toEqual({
        total: 0,
        submitted: 0,
        interviews: 0,
        offers: 0,
      });
      expect(data.matches).toEqual({ total: 0, applied: 0, saved: 0 });
      expect(data.interviews).toEqual([]);
      expect(data.jobMatchesList).toEqual([]);
      expect(data.applicationsList).toEqual([]);
      expect(data.profile).toHaveProperty("completionScore");
    });

    it("should aggregate application counts by status", async () => {
      await Application.create([
        {
          userId: user._id,
          jobId: job._id,
          status: { current: "Submitted" },
          appliedAt: new Date(),
        },
        {
          userId: user._id,
          jobId: job._id,
          status: { current: "Interview Scheduled" },
          appliedAt: new Date(),
        },
        {
          userId: user._id,
          jobId: job._id,
          status: { current: "Offer Received" },
          appliedAt: new Date(),
        },
      ]);

      const data = await dashboardService.getDashboardData(user._id);
      expect(data.applications.total).toBe(3);
      expect(data.applications.submitted).toBe(1);
      expect(data.applications.interviews).toBe(1);
      expect(data.applications.offers).toBe(1);
    });

    it("should aggregate match counts", async () => {
      await JobMatch.create([
        {
          userId: user._id,
          jobId: job._id,
          matchScore: 85,
          status: "Applied",
          isActive: true,
        },
        {
          userId: user._id,
          jobId: job._id,
          matchScore: 70,
          status: "Saved",
          isActive: true,
        },
        {
          userId: user._id,
          jobId: job._id,
          matchScore: 60,
          status: "New",
          isActive: true,
        },
      ]);

      const data = await dashboardService.getDashboardData(user._id);
      expect(data.matches.total).toBe(3);
      expect(data.matches.applied).toBe(1);
      expect(data.matches.saved).toBe(1);
    });

    it("should return jobMatchesList with populated data", async () => {
      await JobMatch.create({
        userId: user._id,
        jobId: job._id,
        matchScore: 90,
        status: "New",
        isActive: true,
      });

      const data = await dashboardService.getDashboardData(user._id);
      expect(data.jobMatchesList).toHaveLength(1);
      expect(data.jobMatchesList[0]).toMatchObject({
        title: "Backend Dev",
        company: "DashCorp",
        match: 90,
      });
    });

    it("should return applicationsList with populated data", async () => {
      await Application.create({
        userId: user._id,
        jobId: job._id,
        status: { current: "Submitted" },
        appliedAt: new Date(),
      });

      const data = await dashboardService.getDashboardData(user._id);
      expect(data.applicationsList).toHaveLength(1);
      expect(data.applicationsList[0].job).toContain("Backend Dev");
      expect(data.applicationsList[0].job).toContain("DashCorp");
      expect(data.applicationsList[0]).toHaveProperty("date");
    });

    it("should compute profile completionScore from skills", async () => {
      await User.findByIdAndUpdate(user._id, {
        profile: { skills: ["Node.js", "React", "MongoDB"] },
      });

      const data = await dashboardService.getDashboardData(user._id);
      expect(data.profile.completionScore).toBe(60); // 30 + 3*10
    });

    it("should return 0 completionScore when no profile", async () => {
      const data = await dashboardService.getDashboardData(user._id);
      expect(data.profile.completionScore).toBe(0);
    });

    it("should cap completionScore at 100", async () => {
      await User.findByIdAndUpdate(user._id, {
        profile: {
          skills: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
        },
      });

      const data = await dashboardService.getDashboardData(user._id);
      expect(data.profile.completionScore).toBe(100);
    });
  });
});
