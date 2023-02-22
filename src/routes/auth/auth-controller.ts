import { NextFunction, Response, Request } from "express";
import { authService } from "../../services/auth-service";
import { errors } from "../../utils/errors";
import { User } from "../../models/user-model";
import { BodyRequest } from "../../@types/request-types";
import { jwtService } from "../../services/jwt-service";
import bcrypt from "bcrypt";

interface AuthResponse {
  user: User;
  authToken: string;
}

export const authController = {
  login: async (
    req: BodyRequest<User>,
    res: Response<AuthResponse>,
    next: NextFunction
  ) => {
    try {
      const user = req.body;
      const storedUser = await authService.findByEmail(user.email);
      if (!storedUser) {
        return next(errors.unsuccesfullLogin("Wrong credentials"));
      }
      const isPasswordMatching = await bcrypt.compare(
        user.password,
        storedUser.password
      );
      if (!isPasswordMatching) {
        return next(errors.unsuccesfullLogin("Wrong credentials"));
      }
      const authToken = jwtService.createToken(storedUser.id);
      const jwtToken = await jwtService.registerToken(authToken);
      if (!jwtToken) {
        return next(errors.unknown);
      }
      const authResponse = {
        user: storedUser,
        authToken: authToken,
      };
      res.status(200).json(authResponse);
    } catch (e) {
      return next(errors.unknown);
    }
  },
  logout: async (
    req: Request,
    res: Response<{ authToken: string }>,
    next: NextFunction
  ) => {
    try {
      if (!req.headers || !req.headers.authorization) {
        return next(errors.invalidParameter);
      }
      const bearerToken = req.headers.authorization.split(" ")[1];
      const jwtToken = await jwtService.deregisterToken(bearerToken);
      if (!jwtToken) {
        return next(errors.unauthorized);
      }
      res.status(200).json({ authToken: jwtToken.value });
    } catch (e) {
      return next(errors.unknown);
    }
  },
  register: async (
    req: BodyRequest<User>,
    res: Response<AuthResponse>,
    next: NextFunction
  ) => {
    try {
      const user = req.body;
      const foundUser = await authService.findByEmail(user.email);
      if (foundUser) {
        return next(errors.unsuccesfullLogin("email already taken"));
      }
      const newUser = await authService.register(user);
      if (!newUser) {
        return next(errors.unknown);
      }
      const authToken = jwtService.createToken(newUser.id);
      const authResponse = {
        user: newUser,
        authToken: authToken,
      };
      res.status(201).json(authResponse);
    } catch (e) {
      return next(errors.unknown);
    }
  },
};
