import registerUser from '../../Services/UserServices/User.Services';
import { Request, Response, NextFunction } from 'express';
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registerUser(req, res, next); // Pass req, res, next to registerUser
  } catch (error) {
    next(error);
  }
}
export default signUp;
