import mongoose, { Schema, Document, Types } from "mongoose";

// Define the Notice interface for TypeScript
interface INotice extends Document {
  team: Types.ObjectId[]; // Array of ObjectIds referencing the User model
  text: string;
  task: Types.ObjectId; // ObjectId referencing the Task model
  notiType: "alert" | "message"; // Enum type for notification type
  isRead: Types.ObjectId[]; // Array of ObjectIds referencing the User model
  createdAt: Date; // Timestamp for document creation
  updatedAt: Date; // Timestamp for document update
}

// Define the schema
const noticeSchema = new Schema<INotice>(
  {
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: { type: String, required: true },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    notiType: { type: String, default: "alert", enum: ["alert", "message"] },
    isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Create the model
const Notice = mongoose.model<INotice>("Notice", noticeSchema);

export default Notice;
