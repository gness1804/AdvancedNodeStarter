const mongoose = require('mongoose');

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.exec = function (...args) {
  // const key = Object.assign({}, this.getQuery(), {
  //   collection: this.mongooseCollection.name,
  // });
  return exec.apply(this, args);
};

// original boilerplate
// const redis = require('redis');
// const util = require('util');

// const redisUrl = 'redis://127.0.0.1:6379';
// const client = redis.createClient(redisUrl);
// client.get = util.promisify(client.get);

// module.exports = client;

// from the /blogs get request handler:

// const blogsCacheKey = `${req.user.id}Blog`;

// const cachedBlogs = await client.get(blogsCacheKey);

// if (cachedBlogs) {
//
//   return res.send(JSON.parse(cachedBlogs));
// }

//

// client.set(blogsCacheKey, JSON.stringify(blogs));
