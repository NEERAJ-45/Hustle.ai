#!/usr/bin/env node
require("dotenv").config();

const { Worker } = require("bullmq");
const { getRedisConnection } = require("../config/redis");
const { QUEUE_NAME } = require("../services/queueService");
const { queueLogger: logger } = require("../utils/logger");
const connectDB = require("../config/db");
const User = require("../models/user.model");
const Job = require("../models/job.model");
const Application = require("../models/Application.model");
const { tailorResume } = require("../services/resumeTailoringService");
const { generateCoverLetter } = require("../services/coverLetterGeneratorService");

connectDB();

const CONCURRENCY = parseInt(process.env.WORKER_CONCURRENCY, 10) || 3;

const processor = async (job) => {
  logger.log(`[Worker] Processing job ${job.id} | name=${job.name} | attempt=${job.attemptsMade + 1}`);

  const { userId, jobId, candidateId } = job.data;
  const effectiveUserId = userId || candidateId;

  if (!effectiveUserId || !jobId) {
    throw new Error("Missing required fields: userId and jobId");
  }

  const user = await User.findById(effectiveUserId);
  if (!user) {
    throw new Error(`User ${effectiveUserId} not found`);
  }

  const targetJob = await Job.findById(jobId);
  if (!targetJob) {
    throw new Error(`Job ${jobId} not found`);
  }

  logger.log(`[Worker] Auto-applying for ${user.email} → ${targetJob.title} at ${targetJob.company?.name}`);

  const existingApp = await Application.findOne({ userId: effectiveUserId, jobId });
  if (existingApp) {
    logger.log(`[Worker] Application already exists for user ${effectiveUserId} and job ${jobId}, skipping`);
    return { status: "skipped", reason: "duplicate", processedAt: new Date().toISOString() };
  }

  let tailoredResume = null;
  let coverLetterResult = null;

  try {
    tailoredResume = await tailorResume(effectiveUserId, jobId);
    logger.log(`[Worker] Tailored resume generated: ${tailoredResume.fileInfo.filename}`);
  } catch (err) {
    logger.log(`[Worker] Resume tailoring failed: ${err.message}`);
  }

  try {
    coverLetterResult = await generateCoverLetter(effectiveUserId, jobId);
    logger.log(`[Worker] Cover letter generated: ${coverLetterResult.filename}`);
  } catch (err) {
    logger.log(`[Worker] Cover letter generation failed: ${err.message}`);
  }

  const application = new Application({
    userId: effectiveUserId,
    jobId,
    resumeId: tailoredResume?._id,
    coverLetterId: coverLetterResult?.coverLetter?._id,
    status: {
      current: "Submitted",
      history: [{ status: "Submitted", changedAt: new Date(), source: "System" }],
      lastUpdated: new Date(),
    },
    automation: {
      isAutomated: true,
      automationEngine: "auto-apply-worker",
      submittedVia: "API",
      automationLogs: [{ timestamp: new Date(), action: "auto_apply", success: true }],
    },
    appliedAt: new Date(),
  });

  await application.save();
  logger.log(`[Worker] Application created: ${application._id}`);

  return {
    status: "processed",
    applicationId: application._id,
    resumeId: tailoredResume?._id || null,
    coverLetterId: coverLetterResult?.coverLetter?._id || null,
    processedAt: new Date().toISOString(),
  };
};

const worker = new Worker(QUEUE_NAME, processor, {
  connection: getRedisConnection(),
  concurrency: CONCURRENCY,
});

worker.on("completed", (job, result) => {
  logger.log(`[Worker:completed] Job ${job.id} → ${JSON.stringify(result)}`);
});

worker.on("failed", (job, err) => {
  logger.log(`[Worker:failed] Job ${job?.id} → ${err.message} (attempt ${job?.attemptsMade}/${job?.opts?.attempts})`);
});

worker.on("error", (err) => {
  logger.log(`[Worker:error] ${err.message}`);
});

const shutdown = async (signal) => {
  logger.log(`[Worker] Received ${signal}. Shutting down gracefully…`);
  await worker.close();
  logger.log("[Worker] Worker closed. Exiting.");
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

console.log(`Auto-apply worker running | queue="${QUEUE_NAME}" | concurrency=${CONCURRENCY}`);
logger.log(`[Worker] Started | queue="${QUEUE_NAME}" | concurrency=${CONCURRENCY}`);

module.exports = { worker, processor };
