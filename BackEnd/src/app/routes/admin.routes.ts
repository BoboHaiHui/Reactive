import express from 'express';

import { adminController } from '../modules/admin/controller/admin.controllers';
import { roleController } from '../modules/role/controller/role.controlles';
import { checkPermissions } from '../shared/middleware/checkPermission';
import { ensureAuth } from '../shared/middleware/ensureAuth';

const adminRoutes = express.Router();

adminRoutes.route('/roles/createRole').post(ensureAuth(), checkPermissions('CreateRole'), roleController.createRole);

adminRoutes.route('/roles/updateRole').patch(ensureAuth(), checkPermissions('UpdateRole'), roleController.updateRoleByID);

adminRoutes.route('/roles/retrieveRoleById').get(roleController.retrieveRoleById);

adminRoutes.route('/roles/retrieveAllRoles').get(roleController.retrieveAllRoles);

adminRoutes.route('/roles/deleteRoleByType').delete(ensureAuth(), checkPermissions('DeleteRole'), roleController.deleteRole);

adminRoutes.route('/users/retrieveAllUsers').get(ensureAuth(), checkPermissions('RetrieveAllUsers'), adminController.retrieveAll);

adminRoutes.route('/users/retrieveOneUser').get(ensureAuth(), checkPermissions('RetrieveAllUsers'), adminController.retrieveOne);

adminRoutes.route('/users/deleteUser').delete(ensureAuth(), checkPermissions('DeleteUser'), adminController.deleteUser);

adminRoutes.route('/users/editUserData').patch(ensureAuth(), checkPermissions('EditUser'), adminController.editUserByID);

export default adminRoutes;
