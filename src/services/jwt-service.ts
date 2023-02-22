import jwt from "jsonwebtoken";
import jwtModel, { JwtModel } from "../models/jwt-model";
import environMentVariables from "../utils/env-variables";

export const jwtService = {
  createToken: (id: string) => {
    const secret = environMentVariables.getSecret();
    const authToken = jwt.sign(id, secret);
    return authToken;
  },
  registerToken: async (value: string): Promise<JwtModel | void> => {
    return await jwtModel.create({ value });
  },
  deregisterToken: async (value: string): Promise<JwtModel | null> => {
    return await jwtModel.findOneAndDelete({ value });
  },
  checkToken: async (value: string): Promise<JwtModel | null> => {
    return await jwtModel.findOne({ value });
  },
};
