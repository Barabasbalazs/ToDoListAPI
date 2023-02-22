import userModel, { User } from "../models/user-model";
import bcrypt from "bcrypt";
import environMentVariables from "../utils/env-variables";

export const authService = {
  findById: async (id: string): Promise<User | null> => {
    return await userModel.findById(id);
  },
  findByEmail: async (email: string): Promise<User | null> => {
    return await userModel.findOne({ email });
  },
  register: async (user: User): Promise<User | void> => {
    const saltRounds: number = environMentVariables.getSaltRounds();
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    return await userModel.create(user);
  },
};
