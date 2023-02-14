import mongoose, { Document, Schema } from "mongoose";

export interface ToDo extends Document {
  _id: string;
  id: number;
  title: string;
  text: string;
  priority: string;
  createdAt: string;
  isResolved: boolean;
}

const toDoSchema = new Schema({
  id: { type: Number },
  title: { type: String },
  text: { type: String },
  priority: { type: String },
  createdAt: { type: String },
  isResolved: { type: Boolean },
});

export default mongoose.model<ToDo>("todos", toDoSchema);
