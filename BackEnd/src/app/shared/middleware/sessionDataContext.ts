import { NextFunction, Request, Response } from 'express';

import { SessionDataRequest } from '../../modules/session/domain/models/sessionDataRequest';
import { sessionService } from '../diContainer/diContainer';

async function addSessionDataContext(req: Request, res: Response, next: NextFunction){
  if ( req.cookies.sessionId){
    const sessionId = req.cookies.sessionId;
    const sessionData: SessionDataRequest = await sessionService.retrieveSessionData(sessionId);
    req.sessionData = sessionData;
  };
  next();
}

export default addSessionDataContext;