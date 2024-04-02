import { roleService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { Role } from '../domain/model/role';

async function createRole (req, res) {
  const rawUserData: Role = req.body;
  let insertedRole: string;
  try {
    insertedRole = await roleService.createRole(rawUserData);
  } catch (error) {
    logger.critical(error.message, {description:'role.controller -> create role error: ', securityFlag: false, severity: 7})
  };
  if (insertedRole){
    res.status(201).json({ status: 'success', data: insertedRole });
  }else{
    res.status(500).json({ status: 'fail', data: null });
  }
};

async function retrieveRoleById (req, res) {
  const rawRoleData = req.body;
  let retrieveRole: Role;
  try {
    retrieveRole = await roleService.retrieveRoleById(rawRoleData);
  } catch (error) {
    logger.critical(error.message, {description:'role.controller -> create role error: ', securityFlag: false, severity: 7})
  };
  if (Array.isArray(retrieveRole) && retrieveRole.length > 0) {
    res.status(201).json({ status: 'success', data: retrieveRole });
  } else {
      res.status(500).json({ status: 'fail', data: null });
  }
};

export const roleController = {
  createRole: createRole,
  retrieveRoleById: retrieveRoleById,
};