import { response } from 'express';

import { adminService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { IRetrieveOneInput } from '../../user/domain/interface/input/userRegisterInput.interface';
import { User } from '../../user/domain/models/user';
import { IFullProfileUserData } from '../domain/interfaces/admin.interfaces';

async function retrieveAll(req, res) {
  const tableName = 'users';
  let getAllUsers: IFullProfileUserData[];
  try {
    getAllUsers = await adminService.retrieveAll(tableName);
  } catch (error) {
    logger.error(error, { description: 'RetrieveAll error', securityFlag: false, severity: 5 });
  }
  if (getAllUsers) {
    res.status(201).json({ statusText: 'success', data: getAllUsers });
  } else {
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function retrieveOne(req, res) {
  const tableName = 'users';
  const rawData: IRetrieveOneInput = req.body;
  let getUser: User;
  try {
    getUser = await adminService.retrieveOne(tableName, req.body.field, req.body.value);
  } catch (error) {
    logger.error(error, { description: 'RetrieveAll error', securityFlag: false, severity: 5 });
  }
  if (Array.isArray(getUser) && getUser.length > 0) {
    res.status(201).json({ statusText: 'success', data: getUser });
  } else {
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function deleteUserByID(req, res) {
  const rawData: IRetrieveOneInput = req.body;
  try {
    let deleteUser = await adminService.deleteUserByID(req.body.value);
    if (deleteUser) {
      res.status(204).json({ statusText: 'success', data: null });
    } else {
      res.status(404).json({ statusText: 'fail', data: 'Not found' });
    }
  } catch (error) {
    logger.error(error, { description: 'DeleteUser error', securityFlag: false, severity: 5 });
  }
}

export const adminController = {
  retrieveAll: retrieveAll,
  retrieveOne: retrieveOne,
  deleteUser: deleteUserByID
};
