import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errors } from "../utils/errors";
import { authService } from "../services/auth-service";
import { jwtService } from "../services/jwt-service";
import environMentVariables from "../utils/env-variables";

export const authorization = {
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers || !req.headers.authorization) {
      return next(errors.unauthorized);
    }
    const bearerToken = req.headers.authorization.split(" ")[1];

    const jwtToken = await jwtService.checkToken(bearerToken);

    if (!jwtToken) {
      return next(errors.unauthorized);
    }

    const secret = environMentVariables.getSecret();
    const result = jwt.verify(bearerToken, secret) as string;
    const user = await authService.findById(result);
    if (!user) {
      return next(errors.unauthorized);
    }
    req.user = user;
    return next();
  },
};
