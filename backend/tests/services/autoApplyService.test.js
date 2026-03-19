// tests/services/autoApplyService.test.js
// Unit tests for the auto-apply service — verifies it delegates to queueService.

jest.mock("../../src/utils/logger", () => ({ log: jest.fn() }));

jest.mock("../../src/services/queueService", () => ({
  addJob: jest.fn().mockResolvedValue({ id: "bull-job-42" }),
}));

const {
  enqueueAutoApplyJob,
} = require("../../src/services/autoApplyService");
const queueService = require("../../src/services/queueService");
const logger = require("../../src/utils/logger");

describe("autoApplyService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("enqueueAutoApplyJob", () => {
    const userId = "user-123";
    const jobData = {
      candidateId: "cand-456",
      jobId: "job-789",
      resumeUrl: "https://example.com/resume.pdf",
    };

    it("should call queueService.addJob with enriched data", async () => {
      await enqueueAutoApplyJob(userId, jobData);

      expect(queueService.addJob).toHaveBeenCalledTimes(1);
      expect(queueService.addJob).toHaveBeenCalledWith(
        "apply-job",
        expect.objectContaining({
          candidateId: "cand-456",
          jobId: "job-789",
          resumeUrl: "https://example.com/resume.pdf",
          userId: "user-123",
          enqueuedAt: expect.any(String),
        }),
      );
    });

    it("should return an object with jobId and enqueuedAt", async () => {
      const result = await enqueueAutoApplyJob(userId, jobData);

      expect(result).toHaveProperty("jobId", "bull-job-42");
      expect(result).toHaveProperty("enqueuedAt");
      expect(typeof result.enqueuedAt).toBe("string");
    });

    it("should log the enqueue event", async () => {
      await enqueueAutoApplyJob(userId, jobData);

      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining("[AutoApply Enqueued]"),
      );
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining("user-123"),
      );
    });

    it("should set enqueuedAt as a valid ISO date string", async () => {
      const result = await enqueueAutoApplyJob(userId, jobData);
      const parsed = new Date(result.enqueuedAt);

      expect(parsed.toString()).not.toBe("Invalid Date");
    });

    it("should propagate queueService errors", async () => {
      queueService.addJob.mockRejectedValueOnce(new Error("Redis down"));

      await expect(
        enqueueAutoApplyJob(userId, jobData),
      ).rejects.toThrow("Redis down");
    });
  });
});
