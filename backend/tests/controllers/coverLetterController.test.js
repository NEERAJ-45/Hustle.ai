// tests/controllers/coverLetterController.test.js
const controller = require("../../src/controllers/coverLetterController");
const coverLetterService = require("../../src/services/coverLetterService");

jest.mock("../../src/services/coverLetterService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("coverLetterController", () => {
  const mockUser = { userId: "u1", email: "u@t.com" };

  describe("listCoverLetters", () => {
    it("should spread result into response", async () => {
      const result = { data: [{ id: "cl1" }], meta: { total: 1 } };
      coverLetterService.listCoverLetters.mockResolvedValue(result);

      const req = { user: mockUser, query: { page: 1 } };
      const res = mockRes();
      const next = jest.fn();

      await controller.listCoverLetters(req, res, next);
      expect(coverLetterService.listCoverLetters).toHaveBeenCalledWith(
        "u1",
        req.query,
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: [{ id: "cl1" }] }),
      );
    });
  });

  describe("createCoverLetter", () => {
    it("should return 201 with created letter", async () => {
      const data = { id: "cl1", content: "Dear..." };
      coverLetterService.createCoverLetter.mockResolvedValue(data);

      const req = { user: mockUser, body: { content: "Dear..." } };
      const res = mockRes();
      const next = jest.fn();

      await controller.createCoverLetter(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });
  });

  describe("getCoverLetter", () => {
    it("should return letter details", async () => {
      const data = { id: "cl1", content: "Dear..." };
      coverLetterService.getCoverLetter.mockResolvedValue(data);

      const req = { params: { id: "cl1" } };
      const res = mockRes();
      const next = jest.fn();

      await controller.getCoverLetter(req, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });
  });

  describe("updateCoverLetter", () => {
    it("should return updated letter", async () => {
      const data = { id: "cl1", content: "Updated" };
      coverLetterService.updateCoverLetter.mockResolvedValue(data);

      const req = {
        params: { id: "cl1" },
        user: mockUser,
        body: { content: "Updated" },
      };
      const res = mockRes();
      const next = jest.fn();

      await controller.updateCoverLetter(req, res, next);
      expect(coverLetterService.updateCoverLetter).toHaveBeenCalledWith(
        "cl1",
        "u1",
        { content: "Updated" },
        "u@t.com",
      );
    });
  });

  describe("deleteCoverLetter", () => {
    it("should return success", async () => {
      coverLetterService.deleteCoverLetter.mockResolvedValue();

      const req = { params: { id: "cl1" }, user: mockUser };
      const res = mockRes();
      const next = jest.fn();

      await controller.deleteCoverLetter(req, res, next);
      expect(coverLetterService.deleteCoverLetter).toHaveBeenCalledWith(
        "cl1",
        "u1",
        "u@t.com",
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("fail");
      coverLetterService.deleteCoverLetter.mockRejectedValue(err);

      const req = { params: { id: "cl1" }, user: mockUser };
      const res = mockRes();
      const next = jest.fn();

      await controller.deleteCoverLetter(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});
