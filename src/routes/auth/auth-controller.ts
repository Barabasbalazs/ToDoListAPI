import { NextFunction, Response, Request } from "express";
import { authService } from "../../services/auth-service";
import { errors } from "../../utils/errors";
import { User } from "../../models/user-model";
import { BodyRequest } from "../../types/request-types";
import { jwtService } from "../../services/jwt-service";

interface AuthResponse {
  user: User;
  authToken: string;
}

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {},
  logout: async (req: Request, res: Response, next: NextFunction) => {},
  register: async (
    req: BodyRequest<User>,
    res: Response<AuthResponse>,
    next: NextFunction
  ) => {
    const user = req.body;
    const foundUser = await authService.findUser(user.email);
    if (foundUser) {
      return next(errors.unsuccesfullLogin("email already taken"));
    }
    const newUser = await authService.register(user);
    const authToken = jwtService.createToken(newUser.id);
    const authResponse = {
      user: newUser,
      authToken: authToken,
    };
    res.status(201).json(authResponse);
  },
};
