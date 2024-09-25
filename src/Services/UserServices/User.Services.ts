import User from '../../Models/Users/User.model';
import { IUser } from '../../Interfaces/UserInterface/User.interface';

class UserService {
  // Get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    try {
      const data = await User.find();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error fetching users: ' + error.message);
      }
      throw new Error('Error fetching users: ' + String(error));
    }
  };

  // Create new user
  public newUser = async (body: IUser): Promise<IUser> => {
    try {
      const data = await User.create(body);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error creating user: ' + error.message);
      }
      throw new Error('Error creating user: ' + String(error));
    }
  };

  // Update a user
  public updateUser = async (_id: string, body: IUser): Promise<IUser | null> => {
    try {
      const data = await User.findByIdAndUpdate(
        { _id },
        body,
        { new: true, runValidators: true }
      );
      return data; // This can be null if not found
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error updating user: ' + error.message);
      }
      throw new Error('Error updating user: ' + String(error));
    }
  };

  // Delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    try {
      await User.findByIdAndDelete(_id);
      return 'User deleted successfully';
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error deleting user: ' + error.message);
      }
      throw new Error('Error deleting user: ' + String(error));
    }
  };

  // Get a single user
  public getUser = async (_id: string): Promise<IUser | null> => {
    try {
      const data = await User.findById(_id);
      return data; // This can be null if not found
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error fetching user: ' + error.message);
      }
      throw new Error('Error fetching user: ' + String(error));
    }
  };
}

export default UserService;