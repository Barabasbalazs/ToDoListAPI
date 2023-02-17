import userModel, { User } from "../models/user-model";
import bcrypt from "bcrypt";

export const authService = {
  findUser: async (email: string): Promise<User | null> => {
    return await userModel.findOne({ email });
  },
  register: async (user: User): Promise<User | void> => {
    const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "1");
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    return await userModel.create(user);
  },
};
