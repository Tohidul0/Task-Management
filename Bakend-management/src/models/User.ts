import mongoose, { Schema, Document } from "mongoose";

// Define the IUser interface to specify the structure of the User model
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    title?: string;
    isActive: boolean;
    isAdmin?: boolean;
    tasks: Schema.Types.ObjectId[];
    createdAt: Date; // Include createdAt field type
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        title: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: true },
        isAdmin: { type: Boolean, default: false },
        tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    },
    { timestamps: true } 
);


export const User = mongoose.model<IUser>("User", UserSchema);
