const mongoose = require('mongoose');

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.exec = function (...args) {
  return exec.apply(this, args);
};

const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

module.exports = client;
