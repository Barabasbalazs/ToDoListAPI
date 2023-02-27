import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
});

export default mongoose.model<User>("users", userSchema);
