import express from 'express';

import { userController } from '../modules/user/controller/user.controller';

const userRoutes = express.Router();

userRoutes.route('/register')
  .post( userController.register )

userRoutes.route('/retrieveAll')
  .get( userController.retrieveAll )

export default userRoutes;