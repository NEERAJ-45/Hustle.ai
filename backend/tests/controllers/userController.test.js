// tests/controllers/userController.test.js
const userController = require("../../src/controllers/userController");
const userService = require("../../src/services/userService");

jest.mock("../../src/services/userService");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe("userController", () => {
  describe("getProfile", () => {
    it("should return user profile", async () => {
      const user = { id: "u1", name: "Test" };
      userService.getProfile.mockResolvedValue(user);

      const req = { user: { userId: "u1" } };
      const res = mockRes();
      const next = jest.fn();

      await userController.getProfile(req, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: user }),
      );
    });

    it("should call next on error", async () => {
      const err = new Error("not found");
      userService.getProfile.mockRejectedValue(err);

      const req = { user: { userId: "u1" } };
      const res = mockRes();
      const next = jest.fn();

      await userController.getProfile(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe("updateProfile", () => {
    it("should return updated user", async () => {
      const updated = { id: "u1", name: "NewName" };
      userService.updateProfile.mockResolvedValue(updated);

      const req = {
        user: { userId: "u1", email: "u@t.com" },
        body: { name: "NewName" },
      };
      const res = mockRes();
      const next = jest.fn();

      await userController.updateProfile(req, res, next);
      expect(userService.updateProfile).toHaveBeenCalledWith(
        "u1",
        { name: "NewName" },
        "u@t.com",
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: updated }),
      );
    });
  });

  describe("getUserById", () => {
    it("should return user by id", async () => {
      const user = { id: "u2", name: "Other" };
      userService.getUserById.mockResolvedValue(user);

      const req = { params: { id: "u2" } };
      const res = mockRes();
      const next = jest.fn();

      await userController.getUserById(req, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: user }),
      );
    });
  });

  describe("deleteUser", () => {
    it("should return success on delete", async () => {
      userService.deleteUser.mockResolvedValue();

      const req = { params: { id: "u2" }, user: { email: "admin@t.com" } };
      const res = mockRes();
      const next = jest.fn();

      await userController.deleteUser(req, res, next);
      expect(userService.deleteUser).toHaveBeenCalledWith("u2", "admin@t.com");
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true }),
      );
    });
  });
});
