const mongoose = require('mongoose');

const User = mongoose.model('User');

const createUser = () => {
  return new User({
    displayName: 'Dwayne Johnson',
    isTest: true,
  }).save();
};

module.exports = createUser;
