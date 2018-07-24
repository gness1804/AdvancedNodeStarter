const { clearHash } = require('../services/cache');

const deleteUserCache = async (req, res, next) => {
  await next();
  const { id } = req.user;
  clearHash(id);
};

module.exports = deleteUserCache;
