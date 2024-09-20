import { roleService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { IRole } from '../domain/interface/role.interface';
import { Role } from '../domain/model/role';

async function createRole(req, res) {
  const rawUserData: Role = req.body;
  let insertedRole: string;
  try {
    insertedRole = await roleService.createRole(rawUserData);
  } catch (error) {
    logger.critical(error.message, { description: 'role.controller -> create role error: ', securityFlag: false, severity: 7 });
  }
  if (insertedRole) {
    res.status(201).json({ statusText: 'success', data: insertedRole });
  } else {
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function retrieveAllRoles(req, res) {
  let getAllRoles: Role[];
  try {
    getAllRoles = await roleService.retrieveAllRoles();
  } catch (error) {
    logger.error(error, { description: 'RetrieveAll Roles error', securityFlag: false, severity: 5 });
  }
  if (getAllRoles) {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.status(201).json({ statusText: 'success', data: getAllRoles });
  } else {
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function retrieveRoleById(req, res) {
  const rawRoleData = req.body;
  let retrieveRole: Role;
  try {
    retrieveRole = await roleService.retrieveRoleById(rawRoleData);
  } catch (error) {
    logger.critical(error.message, { description: 'role.controller -> create role error: ', securityFlag: false, severity: 7 });
  }
  if (Array.isArray(retrieveRole) && retrieveRole.length > 0) {
    res.status(201).json({ statusText: 'success', data: retrieveRole });
  } else {
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function updateRoleByType(req, res) {
  const updateRoleData: IRole = {
    type: req.body.type,
    description: req.body.description,
    permissions: req.body.permissions
  };
  try {
    let updatedRole = await roleService.updateRoleByType(updateRoleData);
    if (updatedRole) {
      res.status(204).json({ statusText: 'success', data: null });
    } else {
      res.status(404).json({ statusText: 'fail', data: 'Not found' });
    }
  } catch (error) {
    logger.error(error, { description: 'Update Role error', securityFlag: false, severity: 5 });
  }
}

async function deleteRole(req, res) {
  const rawData: any = req.body;
  try {
    let deleteRole = await roleService.deleteRole(req.body.type);
    if (deleteRole) {
      res.status(204).json({ statusText: 'success', data: null });
    } else {
      res.status(404).json({ statusText: 'fail', data: 'Not found' });
    }
  } catch (error) {
    logger.error(error, { description: 'Delete Role error', securityFlag: false, severity: 5 });
  }
}

export const roleController = {
  createRole: createRole,
  retrieveRoleById: retrieveRoleById,
  updateRoleByID: updateRoleByType,
  retrieveAllRoles: retrieveAllRoles,
  deleteRole: deleteRole
};
