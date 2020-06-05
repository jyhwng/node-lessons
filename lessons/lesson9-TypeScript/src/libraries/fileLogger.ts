import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import path from 'path';

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
export default (req: Request, _: Response, next: NextFunction) => {
  logger.log({
    url: req.url,
    level: 'info',
    method: req.method,
    timestamp: moment.now(),
    message: `${moment().format('YYYY-MM-DD HH:mm:SS')}: Incoming ${req.method} request at ${
      req.url
    }`,
  });
  next();
};
