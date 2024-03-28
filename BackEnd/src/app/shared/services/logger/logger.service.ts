import { NextFunction, Request, Response } from 'express';

import config from '../../../../config';
import graylogInstance from './graylog';
import { ILogFormat } from './interface/logFormat.interface';

const graylog = graylogInstance;

const loggerRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    graylog.log(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - UserAgent: [${req.headers['user-agent']}]`);
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        graylog.error(
          `Sending -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - StatusCode: [${res.statusCode}] - StatusMessage: [${res.statusMessage}]`
        );
      } else {
        graylog.log(
          `Sending -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - StatusCode: [${res.statusCode}] - StatusMessage: [${res.statusMessage}]`
        );
      }
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

const start = () => {
  console.log(`Server has started and is listening on port ${config.server.port}`);
  return graylog.log(`Server has started and is listening on port ${config.server.port}`);
};

const stop = async () => {
  console.log('Server is going to sleep');
  return graylog.close();
};

const log = (logFormat: ILogFormat) => {
  return graylog.log({
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
  });
};

const warning = (logFormat: ILogFormat) => {
  return graylog.warning({
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
  });
};

const error = (error: Error, logFormat: ILogFormat) => {
  console.log(logFormat.description + ': ', error.message);
  return graylog.error(error, {
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    errorDescription: error.message,
  });
};

const logger = {
  request: loggerRequest,
  start: start,
  stop: stop,
  log: log,
  error: error,
  warning: warning
};

export default logger;
