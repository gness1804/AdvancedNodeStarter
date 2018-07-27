const { Buffer } = require('safe-buffer');
const Keygrip = require('keygrip');
const { mLabId, cookieKey } = require('../../config/keys');

const id = mLabId;
const sessionObj = {
  passport: {
    user: id,
  },
};
const sessionStr = Buffer.from(JSON.stringify(sessionObj)).toString('base64');
const keygrip = new Keygrip([cookieKey]);
const sig = keygrip.sign(`session=${sessionStr}`);

module.exports = {
  sessionStr,
  sig,
};
