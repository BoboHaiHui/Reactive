import express from 'express';

import { adminController } from '../modules/admin/controller/admin.controllers';
import { roleController } from '../modules/role/controller/role.controlles';
import { checkPermissions } from '../shared/middleware/checkPermission';

const adminRoutes = express.Router();

adminRoutes.route('/createRole').post(roleController.createRole);

adminRoutes.route('/retrieveRoleById').get(roleController.retrieveRoleById);

adminRoutes.route('/retrieveAllUsers').get(checkPermissions('RetrieveAllUsers'), adminController.retrieveAll);

adminRoutes.route('/retrieveOneUser').get(adminController.retrieveOne);

adminRoutes.route('/deleteUser').delete(checkPermissions('DeleteUser'), adminController.deleteUser);

export default adminRoutes;
