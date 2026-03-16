// tests/services/resumeService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");
const mongoose = require("mongoose");
const fs = require("fs");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";

const Resume = require("../../src/models/resume.model");
const resumeService = require("../../src/services/resumeService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

const userId = new mongoose.Types.ObjectId();

const mockFile = {
  originalname: "resume.pdf",
  filename: "resume-abc123.pdf",
  path: "/tmp/test-resume.pdf",
  mimetype: "application/pdf",
  size: 12345,
};

describe("resumeService", () => {
  describe("createResume", () => {
    it("should create a resume with file info", async () => {
      const result = await resumeService.createResume(
        userId,
        mockFile,
        { title: "My Resume" },
        "test@example.com",
      );

      expect(result).toHaveProperty("id");
      expect(result.title).toBe("My Resume");
      expect(result.originalName).toBe("resume.pdf");
      expect(result.mimeType).toBe("application/pdf");
    });
  });

  describe("listResumes", () => {
    beforeEach(async () => {
      await Resume.create([
        {
          userId,
          title: "Resume 1",
          fileInfo: {
            filename: "r1.pdf",
            originalName: "r1.pdf",
            filePath: "/tmp/r1.pdf",
            fileSize: 100,
            mimeType: "application/pdf",
          },
        },
        {
          userId,
          title: "Resume 2",
          fileInfo: {
            filename: "r2.pdf",
            originalName: "r2.pdf",
            filePath: "/tmp/r2.pdf",
            fileSize: 200,
            mimeType: "application/pdf",
          },
        },
      ]);
    });

    it("should return paginated resumes", async () => {
      const result = await resumeService.listResumes(userId, {
        page: 1,
        limit: 10,
      });
      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(2);
    });
  });

  describe("getResume", () => {
    it("should return resume by id", async () => {
      const created = await Resume.create({
        userId,
        title: "Found",
        fileInfo: {
          filename: "f.pdf",
          originalName: "f.pdf",
          filePath: "/tmp/f.pdf",
          fileSize: 50,
          mimeType: "application/pdf",
        },
      });
      const result = await resumeService.getResume(created._id);
      expect(result.title).toBe("Found");
    });

    it("should throw 404 for non-existent id", async () => {
      await expect(
        resumeService.getResume(new mongoose.Types.ObjectId()),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("updateResume", () => {
    it("should update resume title", async () => {
      const created = await Resume.create({
        userId,
        title: "Old Title",
        fileInfo: {
          filename: "u.pdf",
          originalName: "u.pdf",
          filePath: "/tmp/u.pdf",
          fileSize: 50,
          mimeType: "application/pdf",
        },
      });

      const result = await resumeService.updateResume(
        created._id,
        userId,
        { title: "New Title" },
        null,
        "test@example.com",
      );
      expect(result.title).toBe("New Title");
    });

    it("should update resume with new file", async () => {
      const created = await Resume.create({
        userId,
        title: "To Update",
        fileInfo: {
          filename: "old.pdf",
          originalName: "old.pdf",
          filePath: "/tmp/old.pdf",
          fileSize: 50,
          mimeType: "application/pdf",
        },
      });

      const newFile = {
        originalname: "new.pdf",
        filename: "new-abc.pdf",
        path: "/tmp/new-abc.pdf",
        mimetype: "application/pdf",
        size: 99999,
      };

      const result = await resumeService.updateResume(
        created._id,
        userId,
        {},
        newFile,
        "test@example.com",
      );
      expect(result.fileInfo.filename).toBe("new-abc.pdf");
    });

    it("should throw 404 for non-existent resume", async () => {
      await expect(
        resumeService.updateResume(
          new mongoose.Types.ObjectId(),
          userId,
          { title: "X" },
          null,
          "test@example.com",
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("deleteResume", () => {
    it("should delete resume and remove file if exists", async () => {
      // Mock fs.existsSync and fs.unlinkSync
      jest.spyOn(fs, "existsSync").mockReturnValue(true);
      jest.spyOn(fs, "unlinkSync").mockImplementation(() => {});

      const created = await Resume.create({
        userId,
        title: "To Delete",
        fileInfo: {
          filename: "del.pdf",
          originalName: "del.pdf",
          filePath: "/tmp/del.pdf",
          fileSize: 50,
          mimeType: "application/pdf",
        },
      });

      await resumeService.deleteResume(created._id, userId, "test@example.com");
      const found = await Resume.findById(created._id);
      expect(found).toBeNull();
      expect(fs.unlinkSync).toHaveBeenCalled();

      fs.existsSync.mockRestore();
      fs.unlinkSync.mockRestore();
    });

    it("should throw 404 for non-existent resume", async () => {
      await expect(
        resumeService.deleteResume(
          new mongoose.Types.ObjectId(),
          userId,
          "test@example.com",
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
