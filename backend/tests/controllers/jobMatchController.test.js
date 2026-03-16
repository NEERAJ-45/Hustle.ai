// tests/controllers/jobMatchController.test.js
const controller = require("../../src/controllers/jobMatchController");
const jobMatchService = require("../../src/services/jobMatchService");

jest.mock("../../src/services/jobMatchService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("jobMatchController", () => {
  const mockUser = { userId: "u1", email: "u@t.com" };

  describe("listJobMatches", () => {
    it("should return matches", async () => {
      const result = { data: [{ id: "m1" }], meta: { total: 1 } };
      jobMatchService.listJobMatches.mockResolvedValue(result);

      const req = { user: mockUser, query: {} };
      const res = mockRes();
      const next = jest.fn();

      await controller.listJobMatches(req, res, next);
      expect(jobMatchService.listJobMatches).toHaveBeenCalledWith("u1", {});
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("fail");
      jobMatchService.listJobMatches.mockRejectedValue(err);

      const req = { user: mockUser, query: {} };
      const res = mockRes();
      const next = jest.fn();

      await controller.listJobMatches(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe("refreshJobMatches", () => {
    it("should return refreshed data", async () => {
      const data = { summary: { total: 2 }, matches: [] };
      jobMatchService.refreshJobMatches.mockResolvedValue(data);

      const req = { user: mockUser };
      const res = mockRes();
      const next = jest.fn();

      await controller.refreshJobMatches(req, res, next);
      expect(jobMatchService.refreshJobMatches).toHaveBeenCalledWith("u1");
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });
  });
});
