import type { NextFunction } from 'express';
import type { ApiReq, ApiRes } from '../http';

type ContextParams = Pick<ApiReq, 'params'>['params'];
type ContextQuery = Pick<ApiReq, 'query'>['query'];
type ContextBody = Pick<ApiReq, 'body'>['body'];

export type ApiRequestContext = {
  req: ApiReq;
  res: ApiRes;
  next: NextFunction;
  params?: ContextParams;
  query?: ContextQuery;
  body?: ContextBody;
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
