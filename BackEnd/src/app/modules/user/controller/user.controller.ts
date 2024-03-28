import { userService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { User } from '../domain/models/user';

async function register (req, res) {
  try {
    const tableName = 'users';
    const userModel: User = req.body;
    const insertedUser = await userService.register(tableName, userModel);
    res.status(201).json({ status: 'success', data: insertedUser });
  } catch (error) {
    logger.error(error.message, {description:'register error', securityFlag: true, severity: 2})
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function retrieveAll (req, res) {
  try {
    const tableName = 'users';
    const getAllUsers = await userService.retrieveAll(tableName);
    res.status(201).json({ status: 'success', data: getAllUsers });
  } catch (error) {
    logger.error(error, {description: 'RetrieveAll error', securityFlag: false, severity:5})
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const userController = {
  register: register,
  retrieveAll: retrieveAll
};