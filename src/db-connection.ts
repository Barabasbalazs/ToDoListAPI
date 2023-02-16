import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectToDB = async () => {
  const mongoDBUri = process.env.MONGODB_URI;
  if (!mongoDBUri) {
    throw new Error("Unable to connect to DB");
  }
  await mongoose.connect(mongoDBUri).then();
};
