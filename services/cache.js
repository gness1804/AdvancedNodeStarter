const mongoose = require('mongoose');
const client = require('../config/redisConfig');

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function (options = {}) {
  const { key } = options;
  if (!key) {
    console.error('Error: the options object passed into the cache method must have a key property.');
    return this;
  }
  this.useCache = true;
  this.hashKey = JSON.stringify(key);
  return this;
};

mongoose.Query.prototype.exec = async function (...args) {
  if (!this.useCache) {
    return exec.apply(this, args);
  }

  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  }));

  /* eslint-disable new-cap */
  const mapData = (_data) => {
    return _data.map(d => new this.model(d));
  };

  const matchingCachedData = await client.hget(this.hashKey, key);

  // get the data out of redis cache if data exists
  if (matchingCachedData) {
    const rawData = JSON.parse(matchingCachedData);
    return Array.isArray(rawData) ? mapData(rawData) : new this.model(rawData);
  }
  /* eslint-enable new-cap */

  // runs the actual MongoDB query if no cached data is found
  // and sets the cache key value in redis
  const result = await exec.apply(this, args);
  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 60);
  return result;
};


module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
