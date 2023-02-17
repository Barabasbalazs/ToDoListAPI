import mongoose, { Document, Schema } from "mongoose";

export interface ToDo extends Document {
  userId: string;
  title: string;
  text: string;
  priority: number;
  isResolved: { type: boolean; default: false };
}

const toDoSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String },
    text: { type: String },
    priority: { type: Number },
    isResolved: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model<ToDo>("todos", toDoSchema);
