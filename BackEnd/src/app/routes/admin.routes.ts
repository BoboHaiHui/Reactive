import express from 'express';

import { adminController } from '../modules/admin/controller/admin.controllers';
import { roleController } from '../modules/role/controller/role.controlles';
import { checkPermissions } from '../shared/middleware/checkPermission';
import { ensureAuth } from '../shared/middleware/ensureAuth';

const adminRoutes = express.Router();

adminRoutes.route('/createRole').post(roleController.createRole);

adminRoutes.route('/retrieveRoleById').get(roleController.retrieveRoleById);

adminRoutes.route('/retrieveAllUsers').get(ensureAuth(), checkPermissions('RetrieveAllUsers'), adminController.retrieveAll);

adminRoutes.route('/retrieveOneUser').get(adminController.retrieveOne);

adminRoutes.route('/deleteUser').delete(ensureAuth(), checkPermissions('DeleteUser'), adminController.deleteUser);

adminRoutes.route('/editUserData').patch(ensureAuth(), checkPermissions('EditUser'), adminController.editUserByID);
export default adminRoutes;
