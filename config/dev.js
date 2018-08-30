require('dotenv').config();

module.exports = {
  googleClientID:
    process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  mLabId: process.env.MLAB_USER_ID,
  blogTestId: process.env.BLOG_TEST_ID,
  redisUrl: process.env.REDIS_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsBucketName: process.env.AWS_BUCKET_NAME,
};
