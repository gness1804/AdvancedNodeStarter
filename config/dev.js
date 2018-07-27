require('dotenv').config();

module.exports = {
  googleClientID:
    process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  mLabId: process.env.MLAB_USER_ID,
};
