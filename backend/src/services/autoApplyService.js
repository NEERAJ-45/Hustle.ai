// src/services/autoApplyService.js
// Stub service for auto-apply job queue
const logger = require("../utils/logger");

class AutoApplyQueueStub {
  constructor() {
    this.jobs = [];
  }
  enqueue(jobData) {
    // In production, push to a real queue (e.g., Bull, RabbitMQ)
    this.jobs.push({ ...jobData, enqueuedAt: new Date() });
    return true;
  }
  getJobs() {
    return this.jobs;
  }
}

const autoApplyQueue = new AutoApplyQueueStub();

const enqueueAutoApplyJob = (userId, jobData) => {
  const enriched = { ...jobData, userId };
  const result = autoApplyQueue.enqueue(enriched);
  logger.log(
    `[AutoApply Enqueued] userId=${userId} candidateId=${jobData.candidateId} jobId=${jobData.jobId}`,
  );
  return result;
};

module.exports = {
  enqueueAutoApplyJob,
  autoApplyQueue, // for testing/inspection
};
