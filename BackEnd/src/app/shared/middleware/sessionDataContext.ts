import { NextFunction, Request, Response } from 'express';

import { SessionDataRequest } from '../../modules/session/domain/models/sessionDataRequest';
import { sessionService } from '../diContainer/diContainer';
import logger from '../services/logger/logger.service';

async function addSessionDataContext(req: Request, res: Response, next: NextFunction){
  if ( req.cookies.sessionId){
    const sessionId = req.cookies.sessionId;
    try{
      const sessionData: SessionDataRequest = await sessionService.retrieveSessionData(sessionId);
      req.sessionData = sessionData;
    }catch(error){
      logger.debug(error)
      return res.status(500).json({ status: 'fail', data: 'Internal server error' });
    }
  };
  next();
}

export default addSessionDataContext;