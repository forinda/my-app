import type { NextFunction, Request, Response } from 'express';

export type ApiReq = Request & {
  [key: string]: any;
};

export type ApiRes = Response & {
  [key: string]: any;
};

export type ApiNext = NextFunction;
