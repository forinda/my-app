import type { NextFunction } from 'express';
import type { ApiReq, ApiRes } from '../http';
import type { ApiPaginationParams } from '../utils/pagination';
import type { SessionUser } from '../utils/get-sesion-user';

type ContextParams = Pick<ApiReq, 'params'>['params'];
type ContextQuery = Pick<ApiReq, 'query'>['query'];
// type ContextBody = Pick<ApiReq, 'body'>['body'];

export type ApiRequestContext<Body = any> = {
  req: ApiReq;
  res: ApiRes;
  next: NextFunction;
  params?: ContextParams;
  query?: ContextQuery;
  body?: Body;
  pagination?: ApiPaginationParams;
  user?: SessionUser;
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
