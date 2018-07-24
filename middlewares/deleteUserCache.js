const { clearHash } = require('../services/cache');

const deleteUserCache = (req, res, next) => {
  const { id } = req.user;
  clearHash(id);
  return next();
};

module.exports = deleteUserCache;
