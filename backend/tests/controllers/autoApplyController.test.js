// tests/controllers/autoApplyController.test.js
const { autoApply } = require("../../src/controllers/autoApplyController");
const { enqueueAutoApplyJob } = require("../../src/services/autoApplyService");

jest.mock("../../src/services/autoApplyService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("autoApplyController", () => {
  describe("autoApply", () => {
    it("should return 202 and enqueue job", async () => {
      enqueueAutoApplyJob.mockReturnValue(true);

      const req = {
        body: { candidateId: "u1", jobId: "j1" },
        user: { userId: "user123" },
      };
      const res = mockRes();
      const next = jest.fn();

      await autoApply(req, res, next);
      expect(enqueueAutoApplyJob).toHaveBeenCalledWith("user123", req.body);
      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("queue fail");
      enqueueAutoApplyJob.mockImplementation(() => {
        throw err;
      });

      const req = { body: {}, user: { userId: "user123" } };
      const res = mockRes();
      const next = jest.fn();

      await autoApply(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});
