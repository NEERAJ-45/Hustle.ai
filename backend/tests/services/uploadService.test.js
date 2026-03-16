// tests/services/uploadService.test.js
const uploadService = require("../../src/services/uploadService");

describe("uploadService", () => {
  describe("processUpload", () => {
    it("should return file metadata", () => {
      const file = {
        originalname: "doc.pdf",
        filename: "doc-123.pdf",
        path: "/uploads/doc-123.pdf",
        size: 5000,
        mimetype: "application/pdf",
      };

      const result = uploadService.processUpload(file, "user1", "u@test.com");

      expect(result).toEqual({
        filename: "doc-123.pdf",
        path: "/uploads/doc-123.pdf",
        size: 5000,
        mimetype: "application/pdf",
        user: "user1",
      });
    });
  });
});
