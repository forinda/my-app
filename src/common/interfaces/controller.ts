import type { NextFunction } from 'express';
import type { ApiReq, ApiRes } from '../http';

export type ApiRequestContext = {
  req: ApiReq;
  res: ApiRes;
  next: NextFunction;
  params?: Pick<ApiReq, 'params'>['params'];
  query?: Pick<ApiReq, 'query'>['query'];
  body?: Pick<ApiReq, 'body'>['body'];
};

// Define a generic ControllerMethod type
export type ControllerMethod = (
  context: ApiRequestContext
) => Promise<void | ApiRes>;

export type BaseControllerType = {
  post?: ControllerMethod;
  get?: ControllerMethod;
  delete?: ControllerMethod;
  patch?: ControllerMethod;
  put?: ControllerMethod;
};
