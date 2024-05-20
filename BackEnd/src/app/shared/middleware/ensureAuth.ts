import { NextFunction, Request, Response } from 'express';

import { IResponceMessage } from '../../modules/user/domain/interface/input/userRegisterInput.interface';
import logger from '../services/logger/logger.service';

function ensureAuth() {
  return function (req: Request, res: Response, next: NextFunction) {
    let responseMessage: IResponceMessage;
    try {
      if (req.sessionData) {
        next();
      } else {
        responseMessage = { statusText: 'fail', data: 'User must be logged in!' };
        logger.alert({ name: '', message: '' }, { description: 'Access Forbidden', securityFlag: true, severity: 5 });
        res.status(403).send(responseMessage);
      }
    } catch (error) {
      responseMessage = { statusText: 'fail', data: 'Internal Server Error' };
      logger.debug('ensureAuth error', error);
      res.status(500).send(responseMessage);
    }
  };
}

export { ensureAuth };
