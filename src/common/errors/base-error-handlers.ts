/* eslint-disable @typescript-eslint/no-unused-vars */

import { injectable } from 'inversify';
import { Dependency } from '../di';
import type { ApiNext, ApiReq, ApiRes } from '../http';
import { HttpStatus } from '../http';
import { ApiError } from './base';
import type { Router } from 'express';

@injectable()
@Dependency()
export class ApiErrorRouteHandler {
  private catchAllErrorRouteHandler(req: ApiReq, res: ApiRes, next: ApiNext) {
    return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
      message: 'Method not allowed',
      status: 'error'
    });
  }

  private httpErrorRouteHandler(
    error: any,
    req: ApiReq,
    res: ApiRes,
    _next: ApiNext
  ) {
    if (error instanceof ApiError) {
      const { statusCode } = error;

      return res.status(statusCode).json(error.toJSON());
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(ApiError.fromError(error).toJSON());
  }

  plugin({ app }: { app: Router }) {
    app.all('*', this.catchAllErrorRouteHandler);
    app.use(this.httpErrorRouteHandler);
  }
}
