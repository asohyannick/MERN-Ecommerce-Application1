import {Document} from 'mongoose';
export interface IUser extends Document  {
    _id:String | number;
    firstName:String;
    lastName:String;
    email:String;
    password:String
}