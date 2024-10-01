import { Document } from "mongoose";
export interface ProductInterface extends Document {
_id: string | number;
name: string;
price: number;
quantity: number;
location: string;
shipping: string;
}