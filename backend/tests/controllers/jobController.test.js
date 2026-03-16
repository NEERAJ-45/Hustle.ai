// tests/controllers/jobController.test.js
const jobController = require("../../src/controllers/jobController");
const jobService = require("../../src/services/jobService");

jest.mock("../../src/services/jobService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("jobController", () => {
  describe("listJobs", () => {
    it("should spread result into response", async () => {
      const result = { data: [{ title: "Dev" }], meta: { total: 1 } };
      jobService.listJobs.mockResolvedValue(result);

      const req = { query: { page: 1 } };
      const res = mockRes();
      const next = jest.fn();

      await jobController.listJobs(req, res, next);
      expect(jobService.listJobs).toHaveBeenCalledWith(req.query);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: [{ title: "Dev" }] }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("db error");
      jobService.listJobs.mockRejectedValue(err);

      const req = { query: {} };
      const res = mockRes();
      const next = jest.fn();

      await jobController.listJobs(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe("getJobMapData", () => {
    it("should return map data", async () => {
      const result = { data: [], meta: {} };
      jobService.getJobMapData.mockResolvedValue(result);

      const req = { query: {} };
      const res = mockRes();
      const next = jest.fn();

      await jobController.getJobMapData(req, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true }),
      );
    });
  });

  describe("getJobById", () => {
    it("should return job data", async () => {
      const data = { title: "Dev", _id: "j1" };
      jobService.getJobById.mockResolvedValue(data);

      const req = { params: { id: "j1" } };
      const res = mockRes();
      const next = jest.fn();

      await jobController.getJobById(req, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });
  });

  describe("createJob", () => {
    it("should return 201 with created job", async () => {
      const data = { title: "Dev", _id: "j1" };
      jobService.createJob.mockResolvedValue(data);

      const req = { body: { title: "Dev" }, user: { email: "a@b.com" } };
      const res = mockRes();
      const next = jest.fn();

      await jobController.createJob(req, res, next);
      expect(jobService.createJob).toHaveBeenCalledWith(req.body, "a@b.com");
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("updateJob", () => {
    it("should return updated job", async () => {
      const data = { title: "Sr Dev" };
      jobService.updateJob.mockResolvedValue(data);

      const req = {
        params: { id: "j1" },
        body: { title: "Sr Dev" },
        user: { email: "a@b.com" },
      };
      const res = mockRes();
      const next = jest.fn();

      await jobController.updateJob(req, res, next);
      expect(jobService.updateJob).toHaveBeenCalledWith(
        "j1",
        req.body,
        "a@b.com",
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });
  });

  describe("deleteJob", () => {
    it("should return success", async () => {
      jobService.deleteJob.mockResolvedValue();

      const req = { params: { id: "j1" }, user: { email: "a@b.com" } };
      const res = mockRes();
      const next = jest.fn();

      await jobController.deleteJob(req, res, next);
      expect(jobService.deleteJob).toHaveBeenCalledWith("j1", "a@b.com");
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true }),
      );
    });
  });
});
