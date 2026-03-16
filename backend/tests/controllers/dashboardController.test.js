// tests/controllers/dashboardController.test.js
const controller = require("../../src/controllers/dashboardController");
const dashboardService = require("../../src/services/dashboardService");

jest.mock("../../src/services/dashboardService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("dashboardController", () => {
  describe("getDashboard", () => {
    it("should return dashboard data", async () => {
      const dashData = { stats: {}, interviews: [] };
      dashboardService.getDashboardData.mockResolvedValue(dashData);

      const req = { user: { userId: "u1" } };
      const res = mockRes();
      const next = jest.fn();

      await controller.getDashboard(req, res, next);
      expect(dashboardService.getDashboardData).toHaveBeenCalledWith("u1");
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: dashData }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("fail");
      dashboardService.getDashboardData.mockRejectedValue(err);

      const req = { user: { userId: "u1" } };
      const res = mockRes();
      const next = jest.fn();

      await controller.getDashboard(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});
