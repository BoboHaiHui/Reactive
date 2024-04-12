import express from 'express';

import { userController } from '../modules/user/controller/user.controller';
import { checkPermissions } from '../shared/middleware/checkPermission';

const userRoutes = express.Router();

userRoutes.route('/register').post(userController.register);

userRoutes.route('/login').post(userController.login);

userRoutes.route('/logout').get(userController.logout);

userRoutes.route('/userProfileData').post(userController.sendUserProfileData);

//erase this endpoint!!!!!!
userRoutes.route('/retrieveAll').get(userController.retrieveAll);

// userRoutes.route('/retrieveOne')
//   .get( userController.retrieveOne )

userRoutes.route('/updateMyUser').patch(checkPermissions('UpdateMyUser'), userController.updateMyAccount);

export default userRoutes;
