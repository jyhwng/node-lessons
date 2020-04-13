const moment = require('moment');
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.resolve(__dirname, '../storage/logs/nodeJobs.log'),
    }),
  ],
});

/**
 * Log a timestamp with required route in request.
 */
module.exports = (req, res, next) => {
  logger.log({
    url: req.url,
    level: 'info',
    method: req.method,
    timestamp: moment.now(),
  });
  next();
};
