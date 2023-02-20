import mongoose, { Document, Schema } from "mongoose";

export interface JwtModel extends Document {
  value: string;
}

const jwtSchema = new Schema({
  value: { type: String, required: true, index: true },
});

export default mongoose.model<JwtModel>("jwt", jwtSchema);
