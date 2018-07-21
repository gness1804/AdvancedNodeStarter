process.stderr.write('Error: redisClean file is currently under construction and not working.');
process.exit(1);

// const util = require('util');
// const client = require('./redis');

// client.flushall = util.promisify(client.flushall);

// const clearCache = async () => {
//   await client.flushall();
//   process.stdout.write('Redis cache cleaned.');
//   process.exit(0);
// };

// clearCache();
