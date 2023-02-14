import mongoose, { Document, Schema } from "mongoose";

export interface ToDo extends Document {
  title: { type: string; required: true };
  text: { type: string; required: true };
  priority: { type: number; required: true };
  isResolved: { type: boolean; required: true };
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
