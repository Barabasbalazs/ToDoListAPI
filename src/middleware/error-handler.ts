import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface GenericError {
  status: number;
  code: string;
  message: string;
}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  console.log(err.stack);

  let error: GenericError = {
    code: "Unknown",
    status: 400,
    message:
      "An unknown error occurred processing your request. Please try again later.",
  };

  if (err instanceof mongoose.Error.ValidationError) {
    error.code = err.name;
    error.status = 422;
    const key = Object.keys(err.errors)[0];
    error.message = err.errors[key].message;
  } else if (err instanceof Error) {
    const code = (err as any).code;
    error = {
      code: String(code) || err.name,
      status: 400,
      message: err.message,
    };
  }

  return res.status(error.status).json(error);
};
