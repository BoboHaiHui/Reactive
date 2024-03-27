import { userService } from '../../../shared/diContainer/diContainer';
import { User } from '../domain/models/user';

async function register (req, res) {
  try {
    const tableName = 'users';
    const userModel: User = req.body;
    const insertedUser = await userService.register(tableName, userModel);
    res.status(201).json(insertedUser);
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const userController = {
  register: register
};