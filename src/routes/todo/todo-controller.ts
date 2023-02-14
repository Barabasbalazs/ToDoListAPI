import { Response, Request } from "express";

export const testFunc = (req: Request, res: Response) => {
  res.status(200).json({
    foo: "bar",
  });
};
