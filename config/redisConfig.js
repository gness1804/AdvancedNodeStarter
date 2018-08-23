const redis = require('redis');
const util = require('util');
const keys = require('./keys');

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);
client.flushall = util.promisify(client.flushall);

module.exports = client;
