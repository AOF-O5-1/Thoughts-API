import { Router } from 'express';
import { userController } from '../controllers/userController';

const userRoutes = Router();

userRoutes.route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

  userRoutes.route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

  userRoutes.route('/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

export default userRoutes;
