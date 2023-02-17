import { NextFunction, Request, Response } from "express";
import { ErrorReport } from "joi";
import { queryDTO } from "../routes/todos/dto/queryparameters.dto";
import { errors } from "../utils/errors";
import Joi from "joi";

export const validators = {
  toDoValidation: (dto: Joi.ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await dto.validateAsync(req.body);
        return next();
      } catch (e) {
        const errorReport = e as ErrorReport;
        return next(errors.invalidParameter(`: ${errorReport.message}`));
      }
    };
  },
  queryValidation: async (
    req: Request<{}, {}, {}, { sort?: any; order?: any }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sortBy = req.query.sort;
      const order = req.query.order;
      if (!sortBy && !order) {
        return next();
      }
      await queryDTO.validateAsync(req.query);
      return next();
    } catch (e) {
      const errorReport = e as ErrorReport;
      return next(errors.invalidParameter(`: ${errorReport.message}`));
    }
  },
};
