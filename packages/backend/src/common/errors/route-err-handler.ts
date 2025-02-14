/* eslint-disable @typescript-eslint/no-unused-vars */

import { injectable } from 'inversify';
import { Dependency } from '../di';
import type { ApiNext, ApiReq, ApiRes } from '../http';
import { HttpStatus } from '../http';
import { ApiError } from './base';
import type { Router } from 'express';
import { createHttpResponse } from '../utils/responder';

@injectable()
@Dependency()
export class ApiErrorRouteHandler {
  private catchAllErrorRouteHandler(req: ApiReq, res: ApiRes, next: ApiNext) {
    return createHttpResponse(res, {
      message: 'Method not allowed',
      statusCode: HttpStatus.METHOD_NOT_ALLOWED
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

      return createHttpResponse(res, { ...error.toJSON(), statusCode });
    }

    return createHttpResponse(res, {
      statusCode:
        'status' in error ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }

  plugin({ app }: { app: Router }) {
    app.all('*', this.catchAllErrorRouteHandler);
    app.use(this.httpErrorRouteHandler);
  }
}
