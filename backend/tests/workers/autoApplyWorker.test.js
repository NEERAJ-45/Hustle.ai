// tests/workers/autoApplyWorker.test.js
// Tests for the auto-apply worker module.
// BullMQ Worker is fully mocked — no Redis connection required.

// Store the processor callback for testing
let capturedProcessor = null;
let capturedOptions = null;
const capturedEvents = [];
const mockClose = jest.fn().mockResolvedValue();
const mockOn = jest.fn().mockImplementation((evt) => capturedEvents.push(evt));

jest.mock("bullmq", () => ({
  Worker: jest.fn().mockImplementation((name, processor, opts) => {
    capturedProcessor = processor;
    capturedOptions = { name, ...opts };
    return {
      close: mockClose,
      on: mockOn,
    };
  }),
}));

jest.mock("../../src/utils/logger", () => ({ log: jest.fn() }));
jest.mock("../../src/config/redis", () => ({
  getRedisConnection: jest.fn().mockReturnValue({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
  }),
}));
jest.mock("../../src/services/queueService", () => ({
  QUEUE_NAME: "auto-apply",
}));

const { Worker } = require("bullmq");
const logger = require("../../src/utils/logger");

describe("autoApplyWorker", () => {
  beforeAll(() => {
    // Require the worker to trigger Worker constructor
    require("../../src/workers/autoApplyWorker");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Worker instantiation", () => {
    it('should create a Worker for the "auto-apply" queue', () => {
      expect(capturedOptions).toBeDefined();
      expect(capturedOptions.name).toBe("auto-apply");
    });

    it("should set concurrency from WORKER_CONCURRENCY env or default to 3", () => {
      expect(capturedOptions.concurrency).toBe(3);
    });

    it("should pass Redis connection config", () => {
      expect(capturedOptions.connection).toEqual(
        expect.objectContaining({
          host: "127.0.0.1",
          port: 6379,
        }),
      );
    });
  });

  describe("Event listeners", () => {
    it("should register completed, failed, and error event handlers", () => {
      expect(capturedEvents).toContain("completed");
      expect(capturedEvents).toContain("failed");
      expect(capturedEvents).toContain("error");
    });
  });

  describe("Processor function", () => {
    it("should be a function", () => {
      expect(typeof capturedProcessor).toBe("function");
    });

    it("should return a result with status and processedAt", async () => {
      const mockJob = {
        id: "test-job-1",
        name: "apply-job",
        attemptsMade: 0,
        data: { userId: "u1", jobId: "j1" },
      };

      const result = await capturedProcessor(mockJob);

      expect(result).toHaveProperty("status", "processed");
      expect(result).toHaveProperty("processedAt");
      expect(new Date(result.processedAt).toString()).not.toBe("Invalid Date");
    });

    it("should log job data during processing", async () => {
      const mockJob = {
        id: "test-job-2",
        name: "apply-job",
        attemptsMade: 0,
        data: { userId: "u2", jobId: "j2" },
      };

      await capturedProcessor(mockJob);

      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining("[Worker] Processing job test-job-2"),
      );
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining("test-job-2"),
      );
    });
  });
});
