import mongoose from "mongoose";
import environMentVariables from "./utils/env-variables";

mongoose.set("strictQuery", true);

export const connectToDB = async () => {
  const mongoDBUri = environMentVariables.getMongoDBUri();
  if (!mongoDBUri) {
    throw new Error("Unable to connect to DB");
  }
  await mongoose.connect(mongoDBUri).then();
};
