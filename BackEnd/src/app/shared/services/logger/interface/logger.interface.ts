import { ILogFormat } from './logFormat.interface';

export interface ILogger {
  start();
  stop();
  request();
  log(logFormat: ILogFormat);
  debug(description: string, value?:any);
  info(logFormat: ILogFormat);
  notice(logFormat: ILogFormat);
  warning(logFormat: ILogFormat);
  error(error:Error, logFormat: ILogFormat);
  critical(error:Error, logFormat: ILogFormat);
  alert(error:Error, logFormat: ILogFormat);
  emergency(error:Error, logFormat: ILogFormat);
}