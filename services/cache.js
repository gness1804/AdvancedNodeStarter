const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.exec = async function (...args) {
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  }));

  /* eslint-disable new-cap */
  const mapData = (_data) => {
    return _data.map(d => new this.model(d));
  };

  const matchingCachedData = await client.get(key);

  // get the data out of redis cache if data exists
  if (matchingCachedData) {
    const rawData = JSON.parse(matchingCachedData);
    return Array.isArray(rawData) ? mapData(rawData) : new this.model(rawData);
  }
  /* eslint-enable new-cap */

  // runs the actual MongoDB query if no cached data is found
  // and sets the cache key value in redis
  const result = await exec.apply(this, args);
  client.set(key, JSON.stringify(result));
  return result;
};
