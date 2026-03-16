// tests/services/coverLetterService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");
const mongoose = require("mongoose");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";

const CoverLetter = require("../../src/models/cover_letter.model");
const coverLetterService = require("../../src/services/coverLetterService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

const userId = new mongoose.Types.ObjectId();
const jobId = new mongoose.Types.ObjectId();

describe("coverLetterService", () => {
  describe("createCoverLetter", () => {
    it("should create and return a cover letter", async () => {
      const result = await coverLetterService.createCoverLetter(
        userId,
        { jobId, content: "Dear Manager..." },
        "test@example.com",
      );

      expect(result).toHaveProperty("id");
      expect(result.content).toBe("Dear Manager...");
      expect(result.userId.toString()).toBe(userId.toString());
    });
  });

  describe("listCoverLetters", () => {
    beforeEach(async () => {
      await CoverLetter.create([
        { userId, jobId, content: "Letter 1" },
        { userId, jobId, content: "Letter 2" },
        { userId, jobId, content: "Letter 3" },
      ]);
    });

    it("should return paginated cover letters", async () => {
      const result = await coverLetterService.listCoverLetters(userId, {
        page: 1,
        limit: 2,
      });

      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(3);
      expect(result.meta.totalPages).toBe(2);
    });

    it("should default to page 1, limit 10", async () => {
      const result = await coverLetterService.listCoverLetters(userId, {});
      expect(result.data).toHaveLength(3);
      expect(result.meta.page).toBe(1);
    });
  });

  describe("getCoverLetter", () => {
    it("should return cover letter by id", async () => {
      const created = await CoverLetter.create({
        userId,
        jobId,
        content: "Test",
      });
      const result = await coverLetterService.getCoverLetter(created._id);
      expect(result.content).toBe("Test");
    });

    it("should throw 404 for non-existent id", async () => {
      await expect(
        coverLetterService.getCoverLetter(new mongoose.Types.ObjectId()),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("updateCoverLetter", () => {
    it("should update cover letter", async () => {
      const created = await CoverLetter.create({
        userId,
        jobId,
        content: "Old",
      });
      const result = await coverLetterService.updateCoverLetter(
        created._id,
        userId,
        { content: "Updated" },
        "test@example.com",
      );
      expect(result.content).toBe("Updated");
    });

    it("should throw 404 if not owned by user", async () => {
      const created = await CoverLetter.create({
        userId,
        jobId,
        content: "X",
      });
      const otherUser = new mongoose.Types.ObjectId();
      await expect(
        coverLetterService.updateCoverLetter(
          created._id,
          otherUser,
          { content: "Hacked" },
          "other@example.com",
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("deleteCoverLetter", () => {
    it("should delete cover letter", async () => {
      const created = await CoverLetter.create({
        userId,
        jobId,
        content: "Gone",
      });
      await coverLetterService.deleteCoverLetter(
        created._id,
        userId,
        "test@example.com",
      );
      const found = await CoverLetter.findById(created._id);
      expect(found).toBeNull();
    });

    it("should throw 404 for non-existent letter", async () => {
      await expect(
        coverLetterService.deleteCoverLetter(
          new mongoose.Types.ObjectId(),
          userId,
          "test@example.com",
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
