#!/usr/bin/env node
// src/workers/autoApplyWorker.js
// Standalone consumer process for the "auto-apply" queue.
// Run with: npm run worker:auto-apply   (or  node src/workers/autoApplyWorker.js)
//
// Phase 2 stub: logs the job data. Phase 3+ will replace the processor
// body with calls to the ML service, PDF generator, and job-board API.

require("dotenv").config();

const { Worker } = require("bullmq");
const { getRedisConnection } = require("../config/redis");
const { QUEUE_NAME } = require("../services/queueService");
const { queueLogger: logger } = require("../utils/logger");
const connectDB = require("../config/db");
const User = require("../models/user.model");

// Initialize DB connection for the standalone worker
connectDB();

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const CONCURRENCY = parseInt(process.env.WORKER_CONCURRENCY, 10) || 3;

// ---------------------------------------------------------------------------
// Processor — the function that runs for every dequeued job
// ---------------------------------------------------------------------------
/**
 * @param {import("bullmq").Job} job
 * @returns {Promise<{status: string, processedAt: string}>}
 */
const processor = async (job) => {
  logger.log(
    `[Worker] Processing job ${job.id} | name=${job.name} | attempt=${job.attemptsMade + 1}`,
  );
  logger.log(`[Worker] Job ${job.id} data: ${JSON.stringify(job.data)}`);

  // ── Phase 2: Fetch and Log User Data ──────────────────────────────────
  try {
    const user = await User.findById(job.data.userId);
    if (user) {
      logger.log(`[Worker] ✨ User matched! Fetching Profile Data for: ${user.name} (${user.email})`);
      logger.log(`[Worker] Full User Profile Data: ${JSON.stringify(user.profile, null, 2)}`);
    } else {
      logger.log(`[Worker] ⚠️ User ID ${job.data.userId} not found in database.`);
    }
  } catch (dbErr) {
    logger.log(`[Worker] ❌ Error fetching user data from DB: ${dbErr.message}`);
  }
  // ─────────────────────────────────────────────────────────────────────

  const result = {
    status: "processed",
    processedAt: new Date().toISOString(),
  };

  logger.log(`[Worker] Job ${job.id} completed successfully`);
  return result;
};

// ---------------------------------------------------------------------------
// Worker instantiation
// ---------------------------------------------------------------------------
const worker = new Worker(QUEUE_NAME, processor, {
  connection: getRedisConnection(),
  concurrency: CONCURRENCY,
});

// ---------------------------------------------------------------------------
// Lifecycle event handlers
// ---------------------------------------------------------------------------
worker.on("completed", (job, result) => {
  logger.log(
    `[Worker:completed] Job ${job.id} → ${JSON.stringify(result)}`,
  );
});

worker.on("failed", (job, err) => {
  logger.log(
    `[Worker:failed] Job ${job?.id} → ${err.message} (attempt ${job?.attemptsMade}/${job?.opts?.attempts})`,
  );
});

worker.on("error", (err) => {
  // Connection-level errors (Redis down, etc.)
  logger.log(`[Worker:error] ${err.message}`);
});

// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------
const shutdown = async (signal) => {
  logger.log(`[Worker] Received ${signal}. Shutting down gracefully…`);
  await worker.close();
  logger.log("[Worker] Worker closed. Exiting.");
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// ---------------------------------------------------------------------------
// Startup banner
// ---------------------------------------------------------------------------
console.log(
  `🚀 Auto-apply worker running | queue="${QUEUE_NAME}" | concurrency=${CONCURRENCY}`,
);
logger.log(
  `[Worker] Started | queue="${QUEUE_NAME}" | concurrency=${CONCURRENCY}`,
);

module.exports = { worker, processor };
