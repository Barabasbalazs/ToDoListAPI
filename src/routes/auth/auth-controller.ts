import { NextFunction, Request, Response } from "express";
import { authService } from "../../services/auth-service";
import { errors } from "../../utils/errors";
import { User } from "../../models/user-model";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {},
  logout: async (req: Request, res: Response, next: NextFunction) => {},
  register: async (
    req: Request<{}, {}, User>,
    res: Response<{ user: User; authToken: string }>,
    next: NextFunction
  ) => {
    const user = req.body;
    const foundUser = await authService.findUser(user.email);
    if (user) {
      return next(errors.unsuccesfullLogin("email already taken"));
    }
    const newUser = await authService.register(user);
  },
};
