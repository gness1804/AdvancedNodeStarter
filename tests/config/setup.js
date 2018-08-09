/* global jest, beforeAll */

require('../../models/User');
const mongoose = require('mongoose');
const keys = require('../../config/keys');

const User = mongoose.model('User');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

jest.setTimeout(30000);

beforeAll(async () => {
  await User.deleteMany({
    displayName: 'Dwayne Johnson',
  });
});
