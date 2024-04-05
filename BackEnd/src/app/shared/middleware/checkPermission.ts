import { NextFunction, Request, Response } from 'express';

import { IResponceMessage } from '../../modules/user/domain/interface/input/userRegisterInput.interface';
import logger from '../services/logger/logger.service';

function checkPermissions(permission: string) {
  return function(req: Request, res: Response, next: NextFunction) {
    const userPermissions = req.sessionData[0].permissions;
    let responseMessage: IResponceMessage;
    try {
      if (userPermissions && userPermissions.includes(permission)) {
        next();
      } else {
        responseMessage = {status:'fail', data:'Access Forbidden'}
        logger.alert({name:'', message:''},{description: 'Access Forbidden', securityFlag: true, severity:5})
        res.status(403).send(responseMessage);
      }
    } catch (error) {
      responseMessage = {status:'fail', data:'Internal Server Error'}
      res.status(500).send(responseMessage);
    }
  };
}

export { checkPermissions };