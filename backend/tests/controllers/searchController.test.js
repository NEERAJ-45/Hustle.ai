// tests/controllers/searchController.test.js
const controller = require("../../src/controllers/searchController");
const searchService = require("../../src/services/searchService");

jest.mock("../../src/services/searchService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("searchController", () => {
  describe("globalSearch", () => {
    it("should return search results", async () => {
      const data = [{ title: "Dev" }];
      searchService.globalSearch.mockResolvedValue(data);

      const req = {
        query: { q: "dev", type: "job" },
        user: { email: "u@t.com" },
      };
      const res = mockRes();
      const next = jest.fn();

      await controller.globalSearch(req, res, next);
      expect(searchService.globalSearch).toHaveBeenCalledWith(
        req.query,
        "u@t.com",
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("fail");
      searchService.globalSearch.mockRejectedValue(err);

      const req = { query: {}, user: { email: "u@t.com" } };
      const res = mockRes();
      const next = jest.fn();

      await controller.globalSearch(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});
