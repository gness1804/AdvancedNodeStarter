module.exports = {
  googleClientID:
    process.env.GOOGLE_CLIENT_ID, // reuse from dev
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET, // reuse from dev
  mongoURI: process.env.MONGO_URI, // replace with 'mongodb://127.0.0.1:27017/blog_ci'
  cookieKey: process.env.COOKIE_KEY, // reuse from dev
  mLabId: process.env.MLAB_USER_ID, // ?
  blogTestId: process.env.BLOG_TEST_ID, // ?
  redisUrl: process.env.REDIS_URL, // reuse from dev
};
