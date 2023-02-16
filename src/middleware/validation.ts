import { NextFunction, Request, Response } from "express";
import {
  fullToDoValidator,
  partialToDoValidator,
  isValueOfType,
} from "../models/validators";
import { errors } from "../utils/errors";

const sortByProperties = ["createdAt", "priority", "title", "text"];
const orderProperties = ["asc", "desc"];

export const validateToDo = {
  fullValidation: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fullToDoValidator.validateAsync(req.body);
      return next();
    } catch (e) {
      return next(errors.invalidParameter("Invalid ToDo"));
    }
  },
  partialValidation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await partialToDoValidator.validateAsync(req.body);
      return next();
    } catch (e) {
      return next(errors.invalidParameter("Invalid ToDo"));
    }
  },
  queryValidation: async (
    req: Request<{}, {}, {}, { sort?: any; order?: any }>,
    res: Response,
    next: NextFunction
  ) => {
    const sortBy = req.query.sort;
    const order = req.query.order;
    if (!sortBy && !order) {
      return next();
    }
    if (sortBy && order) {
      if (
        isValueOfType(sortBy, sortByProperties) &&
        isValueOfType(order, orderProperties)
      ) {
        return next();
      }
    }
    return next(errors.invalidParameter("Invalid parameters"));
  },
};
