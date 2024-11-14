import type { HttpStatusCodes } from '../http';
import { HttpStatus } from '../http';

type ErrorType = 'error' | 'warning' | 'info';
export class ApiError extends Error {
  public _statusCode: HttpStatusCodes;
  public _meta?: Record<string, any>;
  public _status?: ErrorType;
  constructor(
    message = 'Internal server error',
    statusCode: HttpStatusCodes = HttpStatus.INTERNAL_SERVER_ERROR,
    meta: Record<string, any> = {},
    status: ErrorType = 'error'
  ) {
    super(message);
    this._statusCode = statusCode;
    this._meta = meta;
    this._status = status;
  }

  get statusCode() {
    return this._statusCode;
  }

  get meta() {
    return this._meta;
  }

  set meta(value: Record<string, any> | undefined) {
    this._meta = value;
  }

  set statusCode(value: HttpStatusCodes) {
    this._statusCode = value;
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      meta: this.meta ?? {
        status: this._status
      }
    };
  }

  static fromError(error: Error) {
    return new ApiError(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
      unknown: true
    });
  }
}
