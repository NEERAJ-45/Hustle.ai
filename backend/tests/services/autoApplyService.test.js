// tests/services/autoApplyService.test.js
jest.mock("../../src/utils/logger", () => ({ log: jest.fn() }));

const {
  enqueueAutoApplyJob,
  autoApplyQueue,
} = require("../../src/services/autoApplyService");

describe("autoApplyService", () => {
  beforeEach(() => {
    // Clear queue between tests
    autoApplyQueue.jobs = [];
  });

  describe("enqueueAutoApplyJob", () => {
    it("should enqueue a job and return true", () => {
      const result = enqueueAutoApplyJob("user1", {
        candidateId: "user1",
        jobId: "job1",
        resumeUrl: "https://example.com/resume.pdf",
      });

      expect(result).toBe(true);
      expect(autoApplyQueue.getJobs()).toHaveLength(1);
    });

    it("should add enqueuedAt timestamp and userId", () => {
      enqueueAutoApplyJob("u1", { candidateId: "u1", jobId: "j1" });
      const job = autoApplyQueue.getJobs()[0];
      expect(job).toHaveProperty("enqueuedAt");
      expect(job.enqueuedAt).toBeInstanceOf(Date);
      expect(job.userId).toBe("u1");
    });

    it("should enqueue multiple jobs", () => {
      enqueueAutoApplyJob("u1", { candidateId: "u1", jobId: "j1" });
      enqueueAutoApplyJob("u1", { candidateId: "u1", jobId: "j2" });
      enqueueAutoApplyJob("u2", { candidateId: "u2", jobId: "j3" });

      expect(autoApplyQueue.getJobs()).toHaveLength(3);
    });
  });

  describe("AutoApplyQueueStub", () => {
    it("should return empty array initially", () => {
      expect(autoApplyQueue.getJobs()).toEqual([]);
    });

    it("should preserve job data", () => {
      const data = {
        candidateId: "u1",
        jobId: "j1",
        coverLetter: "Hi",
      };
      autoApplyQueue.enqueue(data);
      const job = autoApplyQueue.getJobs()[0];
      expect(job.candidateId).toBe("u1");
      expect(job.coverLetter).toBe("Hi");
    });
  });
});
