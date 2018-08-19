const { Buffer } = require('safe-buffer');
const Keygrip = require('keygrip');
const { cookieKey } = require('../../config/keys');


const createSession = (user) => {
  const sessionObj = {
    passport: {
      user: user._id,
    },
  };
  const session = Buffer.from(JSON.stringify(sessionObj)).toString('base64');
  const keygrip = new Keygrip([cookieKey]);
  const sig = keygrip.sign(`session=${session}`);
  return {
    session,
    sig,
  };
};

module.exports = createSession;
