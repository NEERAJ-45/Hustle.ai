// tests/controllers/resumeController.test.js
const controller = require("../../src/controllers/resumeController");
const resumeService = require("../../src/services/resumeService");

jest.mock("../../src/services/resumeService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("resumeController", () => {
  const mockUser = { userId: "u1", email: "u@t.com" };

  describe("listResumes", () => {
    it("should spread result into response", async () => {
      const result = { data: [{ id: "r1" }], meta: { total: 1 } };
      resumeService.listResumes.mockResolvedValue(result);

      const req = { user: mockUser, query: { page: 1 } };
      const res = mockRes();
      const next = jest.fn();

      await controller.listResumes(req, res, next);
      expect(resumeService.listResumes).toHaveBeenCalledWith("u1", req.query);
    });
  });

  describe("createResume", () => {
    it("should return 400 when no file provided", async () => {
      const req = { user: mockUser, body: {}, file: undefined };
      const res = mockRes();
      const next = jest.fn();

      await controller.createResume(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false }),
      );
    });

    it("should return 201 with file", async () => {
      const data = { id: "r1", title: "My Resume" };
      resumeService.createResume.mockResolvedValue(data);

      const file = { originalname: "r.pdf", filename: "r-123.pdf" };
      const req = { user: mockUser, body: { title: "My Resume" }, file };
      const res = mockRes();
      const next = jest.fn();

      await controller.createResume(req, res, next);
      expect(resumeService.createResume).toHaveBeenCalledWith(
        "u1",
        file,
        { title: "My Resume" },
        "u@t.com",
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("getResume", () => {
    it("should return resume details", async () => {
      const data = { id: "r1" };
      resumeService.getResume.mockResolvedValue(data);

      const req = { params: { id: "r1" } };
      const res = mockRes();
      const next = jest.fn();

      await controller.getResume(req, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data }),
      );
    });
  });

  describe("updateResume", () => {
    it("should pass file and body to service", async () => {
      const data = { id: "r1" };
      resumeService.updateResume.mockResolvedValue(data);

      const file = { filename: "new.pdf" };
      const req = {
        params: { id: "r1" },
        user: mockUser,
        body: { title: "New" },
        file,
      };
      const res = mockRes();
      const next = jest.fn();

      await controller.updateResume(req, res, next);
      expect(resumeService.updateResume).toHaveBeenCalledWith(
        "r1",
        "u1",
        { title: "New" },
        file,
        "u@t.com",
      );
    });
  });

  describe("deleteResume", () => {
    it("should return success", async () => {
      resumeService.deleteResume.mockResolvedValue();

      const req = { params: { id: "r1" }, user: mockUser };
      const res = mockRes();
      const next = jest.fn();

      await controller.deleteResume(req, res, next);
      expect(resumeService.deleteResume).toHaveBeenCalledWith(
        "r1",
        "u1",
        "u@t.com",
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true }),
      );
    });
  });
});
