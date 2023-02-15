import mongoose, { Document, Schema } from "mongoose";

export interface ToDo extends Document {
  title: string;
  text: string;
  priority: number;
  isResolved: boolean;
}

const toDoSchema = new Schema(
  {
    title: { type: String },
    text: { type: String },
    priority: { type: Number },
    isResolved: { type: Boolean },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model<ToDo>("todos", toDoSchema);
