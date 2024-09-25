import express, { IRouter } from 'express';
import userController from '../../Controllers/UserController/User.Controller';
import userValidator from '../../Validators/UserValidator/User.validators';
import { userAuth } from '../../Middleware/Auth.Middleware/Auth.Middleware';
class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all users
    this.router.get('/all-users', this.UserController.getAllUsers);

    //route to create a new user
    this.router.post(
      '',
      this.UserValidator.newUser,
      this.UserController.newUser
    );

    //route to get a single user
    this.router.get('/:_id', userAuth, this.UserController.getUser);

  
    //route to update a single user
    this.router.put('/:_id', this.UserController.updateUser);

    //route to delete a single user
    this.router.delete('/delete/:_id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;