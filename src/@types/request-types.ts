import { Request } from "express";

export interface QueryRequest<T extends { [queryParam: string]: string }>
  extends Request {
  query: T;
}
export interface BodyRequest<T> extends Request {
  body: T;
}
export interface ParamRequest<
  T extends { [param: string]: string; [captureGroup: number]: string }
> extends Request {
  params: T;
}
export interface ParamBodyRequest<
  U,
  T extends { [param: string]: string; [captureGroup: number]: string }
> extends Request {
  params: T;
  body: U;
}
