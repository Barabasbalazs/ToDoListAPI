import { NextFunction, Request, Response } from "express";
import { fullToDoValidator, partialToDoValidator } from "../models/validators";
import { errors } from "../utils/errors";

export const validateToDo = {
  fullValidation: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fullToDoValidator.validateAsync(req.body);
      next();
    } catch (e) {
      next(errors.invalidParameter("Invalid ToDo"));
    }
  },
  partialValidation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await partialToDoValidator.validateAsync(req.body);
      next();
    } catch (e) {
      next(errors.invalidParameter("Invalid ToDo"));
    }
  },
};
