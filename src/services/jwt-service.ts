import jwt from "jsonwebtoken";

export const jwtService = {
  createToken: (id: string) => {
    const secret = process.env.SECRET || "123456789";
    const authToken = jwt.sign(id, secret);
    return authToken;
  },
};
