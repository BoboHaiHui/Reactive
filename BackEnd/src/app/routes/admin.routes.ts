import express from 'express';

import { adminController } from '../modules/admin/controller/admin.controllers';
import { roleController } from '../modules/role/controller/role.controlles';

const adminRoutes = express.Router();

adminRoutes.route('/createRole').post(roleController.createRole);

adminRoutes.route('/retrieveRoleById').get(roleController.retrieveRoleById);

adminRoutes.route('/retrieveAllUsers').get(adminController.retrieveAll);

adminRoutes.route('/retrieveOneUser').get(adminController.retrieveOne);

export default adminRoutes;
