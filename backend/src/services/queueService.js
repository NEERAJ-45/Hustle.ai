// src/services/queueService.js
// Thin wrapper around BullMQ Queue — acts as the Producer in the
// Producer → Broker → Consumer pattern. No business logic here.

const { Queue } = require("bullmq");
const { getRedisConnection } = require("../config/redis");
const logger = require("../utils/logger");

/** @type {string} Shared queue name used by both producer & worker */
const QUEUE_NAME = "auto-apply";

/** Default job options applied to every enqueued job */
const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000, // 1s → 2s → 4s
  },
  removeOnComplete: {
    age: 24 * 3600, // keep completed jobs for 24 h
    count: 1000, // ...but cap at 1 000 entries
  },
  removeOnFail: {
    age: 7 * 24 * 3600, // keep failed jobs for 7 days (debugging)
  },
};

let queue = null;

/**
 * Lazily initialise and return the singleton BullMQ Queue instance.
 * Lazy init avoids creating a Redis connection at module-load time
 * (important for tests that mock this module).
 *
 * @returns {Queue}
 */
const getQueue = () => {
  if (!queue) {
    queue = new Queue(QUEUE_NAME, {
      connection: getRedisConnection(),
    });

    queue.on("error", (err) => {
      logger.log(`[QueueService] Queue error: ${err.message}`);
    });
  }
  return queue;
};

/**
 * Add a job to the auto-apply queue.
 *
 * @param {string} jobName  – logical name within the queue (e.g. "apply-job")
 * @param {object} data     – payload the worker will receive
 * @param {object} [opts]   – BullMQ JobsOptions overrides
 * @returns {Promise<import("bullmq").Job>} the created BullMQ Job
 */
const addJob = async (jobName, data, opts = {}) => {
  const mergedOpts = { ...DEFAULT_JOB_OPTIONS, ...opts };
  const job = await getQueue().add(jobName, data, mergedOpts);
  logger.log(
    `[QueueService] Job ${job.id} added to "${QUEUE_NAME}" queue (name=${jobName})`,
  );
  return job;
};

/**
 * Gracefully close the queue connection.
 * Called during process shutdown to release the Redis socket.
 */
const close = async () => {
  if (queue) {
    await queue.close();
    queue = null;
    logger.log("[QueueService] Queue connection closed");
  }
};

module.exports = {
  QUEUE_NAME,
  DEFAULT_JOB_OPTIONS,
  getQueue,
  addJob,
  close,
};
