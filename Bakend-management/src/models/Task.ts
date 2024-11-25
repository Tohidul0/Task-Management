// src/models/Task.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    priority: number;
    status: string;
    assignedTo: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Task = mongoose.model<ITask>("Task", TaskSchema);
