import { userService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { User } from '../domain/models/user';

async function register (req, res) {
  const tableName = 'users';
  const userModel: User = req.body;
  let insertedUser: User;
  try {
    insertedUser = await userService.register(tableName, userModel);
  } catch (error) {
    logger.error(error.message, {description:'register error', securityFlag: true, severity: 7})
  };
  if (insertedUser){
    res.status(201).json({ status: 'success', data: insertedUser });
  }else{
    res.status(500).json({ status: 'fail', data: null });
  }
};

async function retrieveAll (req, res) {
  const tableName = 'users';
  let getAllUsers:User[];
  try {
    getAllUsers = await userService.retrieveAll(tableName);
  } catch (error) {
    logger.error(error, {description: 'RetrieveAll error', securityFlag: false, severity:5})
  }
  if (getAllUsers){
    res.status(201).json({ status: 'success', data: getAllUsers });
  } else {
    res.status(500).json({ status: 'fail', data: null });
  }
};

async function retrieveOne (req, res) {
  const tableName = 'users';
  let getUser:User;
  try {
    getUser = await userService.retrieveOne(tableName, req.body.field, req.body.value );
  } catch (error) {
    logger.error(error, {description: 'RetrieveAll error', securityFlag: false, severity:5})
  }
  if (getUser[0]){
    console.log(getUser)
    res.status(201).json({ status: 'success', data: getUser });
  } else {
    res.status(500).json({ status: 'fail', data: null });
  }
};

async function update (req, res) {
  const tableName = 'users';
  const userModel: User = req.body;
  let insertedUser: User;
  try {
    insertedUser = await userService.update(tableName, userModel, 'email', req.body.email);
  } catch (error) {
    logger.error(error.message, {description:'register error', securityFlag: true, severity: 7})
  };
  if (insertedUser){
    res.status(201).json({ status: 'success', data: insertedUser });
  }else{
    res.status(500).json({ status: 'fail', data: null });
  }
};

export const userController = {
  register: register,
  retrieveAll: retrieveAll,
  retrieveOne: retrieveOne,
  update: update,
};