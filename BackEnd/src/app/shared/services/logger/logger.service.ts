import { NextFunction, Request, Response } from 'express';

import config from '../../../../config';
import graylogInstance from './graylog';
import { ILogFormat } from './interface/logFormat.interface';

const graylog = graylogInstance;

const loggerRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - UserAgent: [${req.headers['user-agent']}]`)
  try {
    graylog.log(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - UserAgent: [${req.headers['user-agent']}]`);
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        console.log(`Sending -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - StatusCode: [${res.statusCode}] - StatusMessage: [${res.statusMessage}]`)
        graylog.error(
          `Sending -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - StatusCode: [${res.statusCode}] - StatusMessage: [${res.statusMessage}]`
        );
      } else {
        console.log(`Sending -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - StatusCode: [${res.statusCode}] - StatusMessage: [${res.statusMessage}]`)
        graylog.log(
          `Sending -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - StatusCode: [${res.statusCode}] - StatusMessage: [${res.statusMessage}]`
        );
      }
    });
    next();
  } catch (error) {
    logger.alert(error, {description:'Http log was not send', securityFlag:true, severity:7})
  }
};

const start = () => {
  console.log(`Server has started and is listening on port ${config.server.port}`);
  return graylog.info(`Server has started and is listening on port ${config.server.port}`);
};

const stop = async () => {
  console.log('Server is going to sleep');
  graylog.warning('Server is going to sleep',
    {
    time: new Date().toISOString(),
    type: 'warning'
  })
  return graylog.close();
};

const debug = (description: string, value?: any) => {
  console.log(description, value)
};

const info = (logFormat: ILogFormat) => {
  return graylog.log({
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    type: 'info'
  });
};

const notice = (logFormat: ILogFormat) => {
  return graylog.log({
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    type: 'notice'
  });
};


const log = (logFormat: ILogFormat) => {
  return graylog.log({
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    type: 'log'
  });
};

const warning = (logFormat: ILogFormat) => {
  return graylog.warning({
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    type: 'warning'
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
    type: 'error'
  });
};

const critical = (error: Error, logFormat: ILogFormat) => {
  console.log(logFormat.description + ': ', error.message);
  return graylog.error(error, {
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    errorDescription: error.message,
    type: 'critical'
  });
};

const alert = (error: Error, logFormat: ILogFormat) => {
  console.log(logFormat.description + ': ', error.message);
  return graylog.error(error, {
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    errorDescription: error.message,
    type: 'alert'
  });
};

const emergency = (error: Error, logFormat: ILogFormat) => {
  console.log(logFormat.description + ': ', error.message);
  return graylog.error(error, {
    description: logFormat.description,
    severity: logFormat.severity,
    securityFlag: logFormat.securityFlag,
    time: new Date().toISOString(),
    errorDescription: error.message,
    type: 'emergency'
  });
};

const logger = {
  request: loggerRequest,
  start: start,
  stop: stop,
  log: log,
  debug: debug,
  info: info,
  notice: notice,
  warning: warning,
  error: error,
  critical: critical,
  alert: alert,
  emergency: emergency
};

export default logger;
