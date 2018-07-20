const client = require('./redis');

const util = require('util');
client.flushall = util.promisify(client.flushall);

const clearCache = async () => {
  await client.flushall();
  process.stdout.write('Redis cache cleaned.');
  process.exit(0);
}

clearCache();



