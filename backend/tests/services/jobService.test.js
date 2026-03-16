// tests/services/jobService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");
const mongoose = require("mongoose");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";

const Job = require("../../src/models/job.model");
const jobService = require("../../src/services/jobService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

const sampleJob = {
  title: "Backend Developer",
  description: "Build backend APIs",
  requirements: "3+ years Node.js",
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
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
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
  isActive: true,
};

describe("jobService - pure functions", () => {
  describe("getQueryOptions", () => {
    it("should return defaults for empty query", () => {
      const result = jobService.getQueryOptions({});
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.filter).toEqual({});
    });

    it("should cap limit at 100", () => {
      const result = jobService.getQueryOptions({ limit: 500 });
      expect(result.limit).toBe(100);
    });

    it("should build search filter", () => {
      const result = jobService.getQueryOptions({ search: "Node" });
      expect(result.filter).toHaveProperty("$and");
      expect(result.search).toBe("Node");
    });

    it("should handle location synonyms (Bangalore = Bengaluru)", () => {
      const result = jobService.getQueryOptions({ location: "Bangalore" });
      expect(result.filter).toHaveProperty("$and");
    });

    it("should handle jobType filter", () => {
      const result = jobService.getQueryOptions({ jobType: "Full-Time" });
      expect(result.filter.jobType).toBe("Full-Time");
    });

    it("should handle isRemote filter", () => {
      const result = jobService.getQueryOptions({ isRemote: "true" });
      expect(result.filter["location.isRemote"]).toBe(true);
    });
  });

  describe("buildLocationDetails", () => {
    it("should return location info", () => {
      const result = jobService.buildLocationDetails({
        location: {
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          isRemote: false,
        },
      });
      expect(result.label).toBe("Mumbai, Maharashtra, India");
      expect(result.isRemote).toBe(false);
    });

    it("should return Remote for remote jobs", () => {
      const result = jobService.buildLocationDetails({
        location: { isRemote: true },
      });
      expect(result.isRemote).toBe(true);
      expect(result.workArrangement).toBe("Remote");
    });

    it("should handle null job", () => {
      const result = jobService.buildLocationDetails(null);
      expect(result.label).toBe("Location not specified");
    });
  });

  describe("enrichJobForClient", () => {
    it("should add locationDetails", () => {
      const result = jobService.enrichJobForClient({
        title: "Dev",
        location: { city: "Delhi", country: "India" },
      });
      expect(result).toHaveProperty("locationDetails");
      expect(result.locationDetails.city).toBe("Delhi");
    });
  });

  describe("buildJobApplicationUrl", () => {
    it("should return external URL for External method", () => {
      const url = jobService.buildJobApplicationUrl({
        id: "123",
        title: "Dev",
        applicationMethod: "External",
        externalApplicationUrl: "https://apply.example.com",
      });
      expect(url).toBe("https://apply.example.com");
    });

    it("should return mailto for Email method", () => {
      const url = jobService.buildJobApplicationUrl({
        id: "123",
        title: "Dev",
        applicationMethod: "Email",
        applicationEmail: "hr@example.com",
      });
      expect(url).toContain("mailto:hr@example.com");
    });

    it("should return platform URL as default", () => {
      const url = jobService.buildJobApplicationUrl({
        id: "123",
        title: "Dev",
        applicationMethod: "Platform",
      });
      expect(url).toContain("/dashboard/jobs");
    });
  });

  describe("buildDetailedJD", () => {
    it("should build a complete JD with fallbacks", () => {
      const jd = jobService.buildDetailedJD(sampleJob);
      expect(jd).toHaveProperty("title", "Backend Developer");
      expect(jd).toHaveProperty("companyName", "TestCorp");
      expect(jd).toHaveProperty("experienceRange");
      expect(jd.responsibilities.length).toBeGreaterThan(0);
      expect(jd.specifications.length).toBeGreaterThan(0);
    });
  });
});

describe("jobService - DB operations", () => {
  describe("createJob", () => {
    it("should create and return a job", async () => {
      const job = await jobService.createJob(sampleJob, "admin@test.com");
      expect(job).toHaveProperty("_id");
      expect(job.title).toBe("Backend Developer");
    });
  });

  describe("getJobById", () => {
    it("should return job with locationDetails and detailedJD", async () => {
      const created = await Job.create(sampleJob);
      const job = await jobService.getJobById(created._id);
      expect(job.title).toBe("Backend Developer");
      expect(job).toHaveProperty("locationDetails");
      expect(job).toHaveProperty("detailedJD");
    });

    it("should throw 404 for non-existent id", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await expect(jobService.getJobById(fakeId)).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  describe("listJobs", () => {
    beforeEach(async () => {
      await Job.create([
        sampleJob,
        { ...sampleJob, title: "Frontend Developer", jobType: "Part-Time" },
        { ...sampleJob, title: "DevOps Engineer" },
      ]);
    });

    it("should list jobs with pagination metadata", async () => {
      const result = await jobService.listJobs({ page: 1, limit: 2 });
      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(3);
      expect(result.meta.totalPages).toBe(2);
    });

    it("should filter by jobType", async () => {
      const result = await jobService.listJobs({ jobType: "Part-Time" });
      expect(result.data).toHaveLength(1);
      expect(result.data[0].title).toBe("Frontend Developer");
    });
  });

  describe("updateJob", () => {
    it("should update a job", async () => {
      const created = await Job.create(sampleJob);
      const updated = await jobService.updateJob(
        created._id,
        { title: "Senior Backend Developer" },
        "admin@test.com",
      );
      expect(updated.title).toBe("Senior Backend Developer");
    });

    it("should throw 404 for non-existent job", async () => {
      await expect(
        jobService.updateJob(
          new mongoose.Types.ObjectId(),
          { title: "X" },
          "a@b.com",
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("deleteJob", () => {
    it("should delete a job", async () => {
      const created = await Job.create(sampleJob);
      await jobService.deleteJob(created._id, "admin@test.com");
      const found = await Job.findById(created._id);
      expect(found).toBeNull();
    });

    it("should throw 404 for non-existent job", async () => {
      await expect(
        jobService.deleteJob(new mongoose.Types.ObjectId(), "a@b.com"),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
