const client = require('../config/redisConfig');

const clearCache = async () => {
  await client.flushall();
  process.stdout.write('Redis cache cleaned.');
  process.exit(0);
};

clearCache();
