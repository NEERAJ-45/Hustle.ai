// tests/controllers/authController.test.js
const {
  register,
  login,
  oauthExchange,
  getProfile,
} = require("../../src/controllers/authController");
const authService = require("../../src/services/authService");

jest.mock("../../src/services/authService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("authController", () => {
  describe("register", () => {
    it("should return 201 on success", async () => {
      const result = { token: "tok", user: { id: "1", name: "A" } };
      authService.registerUser.mockResolvedValue(result);

      const req = { body: { name: "A", email: "a@b.com", password: "Pass1!" } };
      const res = mockRes();
      const next = jest.fn();

      await register(req, res, next);

      expect(authService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: result }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("fail");
      authService.registerUser.mockRejectedValue(err);

      const req = { body: {} };
      const res = mockRes();
      const next = jest.fn();

      await register(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe("login", () => {
    it("should return 200 on success", async () => {
      const result = { token: "tok", user: { id: "1" } };
      authService.loginUser.mockResolvedValue(result);

      const req = { body: { email: "a@b.com", password: "Pass1!" } };
      const res = mockRes();
      const next = jest.fn();

      await login(req, res, next);

      expect(authService.loginUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: result }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("bad");
      authService.loginUser.mockRejectedValue(err);

      const req = { body: {} };
      const res = mockRes();
      const next = jest.fn();

      await login(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe("oauthExchange", () => {
    it("should return 200 on success", async () => {
      const result = { token: "tok", user: { id: "1" } };
      authService.oauthExchangeUser.mockResolvedValue(result);

      const req = { body: { email: "o@b.com", provider: "google" } };
      const res = mockRes();
      const next = jest.fn();

      await oauthExchange(req, res, next);

      expect(authService.oauthExchangeUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getProfile", () => {
    it("should return 200 with user data", async () => {
      const user = { id: "u1", name: "Test" };
      authService.getUserProfile.mockResolvedValue(user);

      const req = { user: { userId: "u1" } };
      const res = mockRes();
      const next = jest.fn();

      await getProfile(req, res, next);

      expect(authService.getUserProfile).toHaveBeenCalledWith("u1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: { user } }),
      );
    });
  });
});
