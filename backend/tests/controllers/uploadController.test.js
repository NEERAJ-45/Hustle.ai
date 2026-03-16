// tests/controllers/uploadController.test.js
const controller = require("../../src/controllers/uploadController");
const uploadService = require("../../src/services/uploadService");

jest.mock("../../src/services/uploadService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("uploadController", () => {
  describe("uploadFile", () => {
    it("should return 400 when no file", async () => {
      const req = { user: { userId: "u1", email: "u@t.com" }, file: undefined };
      const res = mockRes();
      const next = jest.fn();

      await controller.uploadFile(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false }),
      );
    });

    it("should return file data on success", async () => {
      const data = { filename: "f.pdf", size: 100 };
      uploadService.processUpload.mockReturnValue(data);

      const file = { originalname: "f.pdf", filename: "f-123.pdf" };
      const req = { user: { userId: "u1", email: "u@t.com" }, file };
      const res = mockRes();
      const next = jest.fn();

      await controller.uploadFile(req, res, next);
      expect(uploadService.processUpload).toHaveBeenCalledWith(
        file,
        "u1",
        "u@t.com",
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("fail");
      uploadService.processUpload.mockImplementation(() => {
        throw err;
      });

      const file = { originalname: "f.pdf" };
      const req = { user: { userId: "u1", email: "u@t.com" }, file };
      const res = mockRes();
      const next = jest.fn();

      await controller.uploadFile(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});
