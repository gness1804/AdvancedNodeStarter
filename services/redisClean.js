const util = require('util');
const client = require('./redis');

client.flushall = util.promisify(client.flushall);

const clearCache = async () => {
  await client.flushall();
  process.stdout.write('Redis cache cleaned.');
  process.exit(0);
};

clearCache();
