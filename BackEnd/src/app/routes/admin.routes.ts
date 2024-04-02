import express from 'express';

import { roleController } from '../modules/role/controller/role.controlles';

const adminRoutes = express.Router();

adminRoutes.route('/createRole')
  .post(roleController.createRole)

adminRoutes.route('/retrieveRoleById')
  .get(roleController.retrieveRoleById)

export default adminRoutes;