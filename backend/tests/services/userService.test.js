// tests/services/userService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");

process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";

const User = require("../../src/models/user.model");
const userService = require("../../src/services/userService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

describe("userService", () => {
  let savedUser;

  beforeEach(async () => {
    savedUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "Str0ng!Pass",
    });
  });

  describe("getProfile", () => {
    it("should return user without passwordHash", async () => {
      const user = await userService.getProfile(savedUser._id);
      expect(user.email).toBe("test@example.com");
      expect(user.passwordHash).toBeUndefined();
    });

    it("should throw 404 for non-existent user", async () => {
      const mongoose = require("mongoose");
      await expect(
        userService.getProfile(new mongoose.Types.ObjectId()),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("updateProfile", () => {
    it("should update and return updated user", async () => {
      const updated = await userService.updateProfile(
        savedUser._id,
        { name: "Updated Name" },
        savedUser.email,
      );
      expect(updated.name).toBe("Updated Name");
    });

    it("should throw 404 for non-existent user", async () => {
      const mongoose = require("mongoose");
      await expect(
        userService.updateProfile(
          new mongoose.Types.ObjectId(),
          { name: "X" },
          "a@b.com",
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("getUserById", () => {
    it("should return user by id", async () => {
      const user = await userService.getUserById(savedUser._id);
      expect(user.email).toBe("test@example.com");
    });

    it("should throw 404 for non-existent id", async () => {
      const mongoose = require("mongoose");
      await expect(
        userService.getUserById(new mongoose.Types.ObjectId()),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe("deleteUser", () => {
    it("should delete user", async () => {
      await userService.deleteUser(savedUser._id, "admin@example.com");
      const found = await User.findById(savedUser._id);
      expect(found).toBeNull();
    });

    it("should throw 404 for non-existent user", async () => {
      const mongoose = require("mongoose");
      await expect(
        userService.deleteUser(
          new mongoose.Types.ObjectId(),
          "admin@example.com",
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
