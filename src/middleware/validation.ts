import { NextFunction, Request, Response } from "express";
import { ErrorReport } from "joi";
import { queryDTO } from "../routes/todos/dto/queryparameters.dto";
import { errors } from "../utils/errors";
import Joi from "joi";
import { QueryRequest } from "../types/request-types";

export const validators = {
  bodyValidation: (dto: Joi.ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await dto.validateAsync(req.body);
        return next();
      } catch (e) {
        return next(errors.invalidParameter(`: ${(e as ErrorReport).message}`));
      }
    };
  },
  parameterValidation: (dto: Joi.ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await dto.validateAsync(req.params);
        return next();
      } catch (e) {
        return next(errors.invalidParameter(`: ${(e as ErrorReport).message}`));
      }
    };
  },
  fullQueryValidation: (dto: Joi.ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await dto.validateAsync(req.query);
        return next();
      } catch (e) {
        return next(errors.invalidParameter(`: ${(e as ErrorReport).message}`));
      }
    };
  },
  optionalQueryValidation: async (
    req: QueryRequest<{ sort?: any; order?: any }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { sort, order } = req.query;
      if (!sort && !order) {
        return next();
      }
      await queryDTO.validateAsync(req.query);
      return next();
    } catch (e) {
      return next(errors.invalidParameter(`: ${(e as ErrorReport).message}`));
    }
  },
};
