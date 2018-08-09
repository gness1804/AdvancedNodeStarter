const mongoose = require('mongoose');

const User = mongoose.model('User');

const createUser = () => {
  return new User({
    displayName: 'Dwayne Johnson',
  }).save();
};

module.exports = createUser;
