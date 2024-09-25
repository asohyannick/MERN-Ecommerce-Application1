import { Schema, model } from 'mongoose';
import { IUser } from '../../Interfaces/UserInterface/User.interface';

const userSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model<IUser>('User', userSchema);