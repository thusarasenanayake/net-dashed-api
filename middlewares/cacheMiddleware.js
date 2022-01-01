const setCacheToOneDay = (req, res, next) => {
  res.set('Cache-Control', 'private, max-age=86400');
  next();
};

module.exports = {
  setCacheToOneDay,
};
