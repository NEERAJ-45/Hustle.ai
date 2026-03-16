// tests/services/authService.test.js
const { connect, disconnect, clearDB } = require("../helpers/db");
const { makeUser } = require("../helpers/fixtures");

// Set env before requiring service
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.JWT_EXPIRE = "1h";

const User = require("../../src/models/user.model");
const authService = require("../../src/services/authService");

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearDB());

describe("authService", () => {
  describe("registerUser", () => {
    it("should register a new user and return token + user", async () => {
      const result = await authService.registerUser({
        name: "Alice",
        email: "alice@example.com",
        password: "Str0ng!Pass",
      });

      expect(result).toHaveProperty("token");
      expect(result.user).toMatchObject({
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      });
      expect(result.user).toHaveProperty("id");
    });

    it("should throw 409 for duplicate email", async () => {
      await User.create({
        name: "Existing",
        email: "dup@example.com",
        password: "Str0ng!Pass",
      });

      await expect(
        authService.registerUser({
          name: "New",
          email: "dup@example.com",
          password: "Str0ng!Pass",
        }),
      ).rejects.toMatchObject({ statusCode: 409 });
    });
  });

  describe("loginUser", () => {
    beforeEach(async () => {
      await authService.registerUser({
        name: "Bob",
        email: "bob@example.com",
        password: "Str0ng!Pass",
      });
    });

    it("should login with valid credentials", async () => {
      const result = await authService.loginUser({
        email: "bob@example.com",
        password: "Str0ng!Pass",
      });

      expect(result).toHaveProperty("token");
      expect(result.user.email).toBe("bob@example.com");
    });

    it("should throw 401 for wrong password", async () => {
      await expect(
        authService.loginUser({
          email: "bob@example.com",
          password: "WrongPass1!",
        }),
      ).rejects.toMatchObject({ statusCode: 401 });
    });

    it("should throw 401 for non-existent user", async () => {
      await expect(
        authService.loginUser({
          email: "nobody@example.com",
          password: "Str0ng!Pass",
        }),
      ).rejects.toMatchObject({ statusCode: 401 });
    });
  });

  describe("oauthExchangeUser", () => {
    it("should create a new user via OAuth", async () => {
      const result = await authService.oauthExchangeUser({
        email: "oauth@example.com",
        name: "OAuth User",
        provider: "google",
        providerAccountId: "google-123",
      });

      expect(result).toHaveProperty("token");
      expect(result.user.email).toBe("oauth@example.com");
    });

    it("should return existing user on repeat OAuth", async () => {
      await authService.oauthExchangeUser({
        email: "repeat@example.com",
        name: "First",
        provider: "google",
        providerAccountId: "g-456",
      });

      const result = await authService.oauthExchangeUser({
        email: "repeat@example.com",
        name: "Second",
        provider: "google",
        providerAccountId: "g-456",
      });

      expect(result.user.email).toBe("repeat@example.com");
    });

    it("should throw 400 for missing fields", async () => {
      await expect(
        authService.oauthExchangeUser({ email: "a@b.com" }),
      ).rejects.toMatchObject({ statusCode: 400 });
    });
  });

  describe("getUserProfile", () => {
    it("should return user profile", async () => {
      const { user } = await authService.registerUser({
        name: "Profile",
        email: "profile@example.com",
        password: "Str0ng!Pass",
      });

      const profile = await authService.getUserProfile(user.id);
      expect(profile.email).toBe("profile@example.com");
      expect(profile).toHaveProperty("name");
    });

    it("should throw 404 for unknown userId", async () => {
      const mongoose = require("mongoose");
      const fakeId = new mongoose.Types.ObjectId();
      await expect(authService.getUserProfile(fakeId)).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });
});
