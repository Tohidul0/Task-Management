import mongoose, { Schema, Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

// Define interfaces for the schema
export interface IActivity {
  type: "assigned" | "started" | "in progress" | "bug" | "completed" | "commented";
  activity?: string;
  date?: Date;
  by?: mongoose.Types.ObjectId; // Reference to User
}

export interface ISubTask {
  title?: string;
  date?: Date;
  tag?: string;
}

export interface ITeamMember {
  _id: ObjectId | string;
  name: string;
  email: string;
  
  role: string;
  title?: string;
  isActive: boolean;
  isAdmin?: boolean;
  tasks: ObjectId[]; // Use ObjectId[] for task references
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends Document {
  title: string;
  date: Date;
  priority: "high" | "medium" | "normal" | "low";
  stage: "todo" | "in progress" | "completed";
  activities: IActivity[];
  subTasks: ISubTask[];
  assets: string[];
  team: ITeamMember[]; // Array of team member objects
  isTrashed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for team member (embedded object in task)
const teamMemberSchema: Schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    title: { type: String },
    isActive: { type: Boolean, required: true },
    isAdmin: { type: Boolean },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false } // Prevent Mongoose from generating a new _id for each embedded team member
);


// Define the main task schema
const taskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [teamMemberSchema], // Array of team member objects
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
  
);

// Create the model with types
export const Task = mongoose.model<ITask>("Task", taskSchema);
