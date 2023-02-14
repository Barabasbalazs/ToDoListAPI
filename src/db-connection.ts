import mongoose from "mongoose";
import { throwError } from "./utils/error";

mongoose.set("strictQuery", true);

export const connectToDB = () => {
  const mongoDBUri = process.env.MONGODB_URI;

  if (mongoDBUri) {
    mongoose.connect(mongoDBUri).then();
  } else {
    throwError("Unable to connect to MongoDB!");
  }
};
