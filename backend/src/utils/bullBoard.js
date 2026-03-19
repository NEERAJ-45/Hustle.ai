const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const queueService = require('../services/queueService');

// Create the adapter for Express
const serverAdapter = new ExpressAdapter();

// Match the basePath to the route where you mount it in index.js
serverAdapter.setBasePath('/admin/queues');

// Initialize Bull Board with our queue
createBullBoard({
  queues: [new BullMQAdapter(queueService.getQueue())],
  serverAdapter: serverAdapter,
});

// Export the router so we can mount it in index.js
module.exports = serverAdapter.getRouter();
