import express from 'express';

import { User } from './app/modules/user/domain/models/user';
import { userService } from './app/shared/diContainer/diContainer';
import { config } from './config';

let app = express();
app.use(express.json());

// Create an instance of BaseService

app.post('/users', async (req, res) => {
  try {
    const tableName = 'users';
    const userModel: User = req.body;
    console.log('USER^^', req)
    const insertedUser = await userService.create(tableName, userModel);
    res.status(201).json(insertedUser);
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port: number = config.server.port;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});