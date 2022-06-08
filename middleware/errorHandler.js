const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(err.message);
  next();
};

module.exports = errorHandler;
