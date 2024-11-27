import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

// Define the IUser interface to specify the structure of the User model
export interface IUser extends Document {
  _id: ObjectId | string;
  name: string;
  email: string;
  password: string;
  role: string;
  title?: string;
  isActive: boolean;
  isAdmin?: boolean;
  tasks: ObjectId[]; // Use ObjectId[] for task references
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    title: { type: String },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt`
);

// Export the User model
export const User = mongoose.model<IUser>("User", UserSchema);
