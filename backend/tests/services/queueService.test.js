// tests/services/queueService.test.js
// Unit tests for the BullMQ queue service wrapper.
// BullMQ is fully mocked — no Redis connection required.

jest.mock("bullmq", () => {
  const addMock = jest.fn().mockResolvedValue({ id: "mock-job-1" });
  const closeMock = jest.fn().mockResolvedValue();
  const onMock = jest.fn();

  const QueueMock = jest.fn().mockImplementation(() => ({
    add: addMock,
    close: closeMock,
    on: onMock,
  }));

  // Attach mocks for assertion access
  QueueMock._addMock = addMock;
  QueueMock._closeMock = closeMock;
  QueueMock._onMock = onMock;

  return { Queue: QueueMock };
});

jest.mock("../../src/utils/logger", () => ({ log: jest.fn() }));

// Must require AFTER mocks are in place
const { Queue } = require("bullmq");
const {
  addJob,
  close,
  getQueue,
  QUEUE_NAME,
  DEFAULT_JOB_OPTIONS,
} = require("../../src/services/queueService");

describe("queueService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("QUEUE_NAME", () => {
    it('should be "auto-apply"', () => {
      expect(QUEUE_NAME).toBe("auto-apply");
    });
  });

  describe("DEFAULT_JOB_OPTIONS", () => {
    it("should specify 3 attempts with exponential backoff", () => {
      expect(DEFAULT_JOB_OPTIONS.attempts).toBe(3);
      expect(DEFAULT_JOB_OPTIONS.backoff).toEqual({
        type: "exponential",
        delay: 1000,
      });
    });

    it("should configure removeOnComplete and removeOnFail policies", () => {
      expect(DEFAULT_JOB_OPTIONS.removeOnComplete).toBeDefined();
      expect(DEFAULT_JOB_OPTIONS.removeOnFail).toBeDefined();
    });
  });

  describe("getQueue()", () => {
    it("should create a Queue instance with the correct name", () => {
      const q = getQueue();
      expect(q).toBeDefined();
      expect(Queue).toHaveBeenCalledWith(
        "auto-apply",
        expect.objectContaining({ connection: expect.any(Object) }),
      );
    });

    it("should return the same instance on subsequent calls (singleton)", () => {
      const q1 = getQueue();
      const q2 = getQueue();
      expect(q1).toBe(q2);
    });
  });

  describe("addJob()", () => {
    it("should call queue.add() with job name, data, and merged options", async () => {
      const data = { userId: "u1", jobId: "j1" };
      const result = await addJob("apply-job", data);

      expect(Queue._addMock).toHaveBeenCalledWith(
        "apply-job",
        data,
        expect.objectContaining({
          attempts: 3,
          backoff: { type: "exponential", delay: 1000 },
        }),
      );
      expect(result).toEqual({ id: "mock-job-1" });
    });

    it("should allow overriding default options", async () => {
      await addJob("apply-job", { userId: "u2" }, { attempts: 5 });

      expect(Queue._addMock).toHaveBeenCalledWith(
        "apply-job",
        { userId: "u2" },
        expect.objectContaining({ attempts: 5 }),
      );
    });
  });

  describe("close()", () => {
    it("should call queue.close() and reset the singleton", async () => {
      // Ensure queue is initialised
      getQueue();
      await close();

      expect(Queue._closeMock).toHaveBeenCalled();
    });
  });
});
