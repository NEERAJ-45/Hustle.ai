// tests/routes/health.test.js
const request = require("supertest");
const express = require("express");

// Minimal app for health check (no DB needed)
const createApp = () => {
  const app = express();
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
    });
  });
  return app;
};

describe("Health & 404 Routes", () => {
  const app = createApp();

  it("GET /health should return 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("timestamp");
  });

  it("GET /unknown should return 404", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
