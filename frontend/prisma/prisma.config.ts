// Prisma 7.x config file: use plain object export
module.exports = {
  db: {
    adapter: process.env.DATABASE_URL,
  },
};
