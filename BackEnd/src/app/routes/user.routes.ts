import express from 'express';

import { userController } from '../modules/user/controller/user.controller';

const userRoutes = express.Router();

userRoutes.route('/register')
  .post( userController.register )

userRoutes.route('/login')
  .post( userController.login )

userRoutes.route('/retrieveAll')
  .get( userController.retrieveAll )

userRoutes.route('/retrieveOne')
  .get( userController.retrieveOne )

userRoutes.route('/update')
  .patch( userController.update )

export default userRoutes;