// src/config/redis.js
// Centralised Redis connection configuration for BullMQ queues & workers.
// Every queue / worker imports from here so connection details stay DRY.

/**
 * Returns the IORedis-compatible connection object used by BullMQ.
 *
 * Reads from environment variables with sensible defaults:
 *   REDIS_HOST  – default "127.0.0.1"
 *   REDIS_PORT  – default 6379
 *   REDIS_PASSWORD – optional, omitted when not set
 *
 * @returns {{ host: string, port: number, password?: string, maxRetriesPerRequest: null }}
 */
const getRedisConnection = () => {
  const connection = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    // BullMQ requires this to be null so blocking commands (BLPOP) don't time out.
    maxRetriesPerRequest: null,
  };

  if (process.env.REDIS_PASSWORD) {
    connection.password = process.env.REDIS_PASSWORD;
  }

  return connection;
};

module.exports = { getRedisConnection };
