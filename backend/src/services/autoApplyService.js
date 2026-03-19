// src/services/autoApplyService.js
// Enqueues auto-apply jobs into the BullMQ "auto-apply" queue via queueService.
const logger = require("../utils/logger");
const queueService = require("./queueService");

/**
 * Validate and enqueue an auto-apply job.
 *
 * @param {string} userId   – Authenticated user's ID (from JWT)
 * @param {object} jobData  – Validated request body (candidateId, jobId, resumeUrl, etc.)
 * @returns {Promise<{jobId: string, enqueuedAt: string}>}
 */
const enqueueAutoApplyJob = async (userId, jobData) => {
  const enriched = {
    ...jobData,
    userId,
    enqueuedAt: new Date().toISOString(),
  };

  const job = await queueService.addJob("apply-job", enriched);

  logger.log(
    `[AutoApply Enqueued] userId=${userId} candidateId=${jobData.candidateId} jobId=${jobData.jobId} queueJobId=${job.id}`,
  );

  return { jobId: job.id, enqueuedAt: enriched.enqueuedAt };
};

module.exports = {
  enqueueAutoApplyJob,
};
