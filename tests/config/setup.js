/* global jest, afterAll */

require('../../models/User');
require('../../models/Blog');
const mongoose = require('mongoose');
const keys = require('../../config/keys');

const User = mongoose.model('User');
const Blog = mongoose.model('Blog');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

jest.setTimeout(30000);

// nuke all the test blog data after each test run
afterAll(async () => {
  await User.deleteMany({
    displayName: 'Dwayne Johnson',
  });
  await Blog.deleteMany({
    title: 'Mal\'s big day out',
  });
  process.stdout.write('Deleted all test users and blogs.');
});
