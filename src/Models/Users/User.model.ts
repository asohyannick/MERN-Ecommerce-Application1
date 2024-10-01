import { Schema, model } from "mongoose";
import { IUser } from "../../Interfaces/UserInterface/User.interface";
import bcryptjs from 'bcryptjs';
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

// Hash user password
userSchema.pre<IUser>('save', async function(next: () => void) {
  if(this.isModified('password')) {
    // Hash the password and return it back 
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

export default model<IUser>("User", userSchema);
