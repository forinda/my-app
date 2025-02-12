import { ApiError } from '../errors/base';
import type { ApiRes } from '../http';

type HttpResp<T> = {
  status: number;
  data: T;
  message: string;
  access: boolean;
};

type CreateRespProps<T> = {
  status: number;
  data?: T;
  message?: string;
  access?: boolean;
};

export function serializeToBuffer(payload: any) {
  return Buffer.from(JSON.stringify(payload), 'utf-8');
}

export function createHttpResponse<T = unknown>(
  res: ApiRes,
  { data, message = 'success', status, access = true }: CreateRespProps<T>
) {
  res.statusCode = status;
  const buffer = serializeToBuffer({
    status,
    data: data as T,
    message,
    access
  });

  return res.end(buffer);
}

export function createHttpResponseWithPagination<T = unknown>(
  res: ApiRes,
  {
    data,
    message = 'success',
    status,
    access = true,
    total
  }: CreateRespProps<T> & { total: number }
): HttpResp<T> & { total: number } {
  res.node.res.statusCode = status;

  return {
    status,
    data: data as T,
    message,
    access,
    total
  };
}

export function createHttpErrorResponse(
  res: ApiRes,
  error: any,
  access = true
) {
  if (error instanceof ApiError) {
    const { statusCode } = error;

    res.node.res.statusCode = statusCode;

    return createHttpResponse(res, {
      status: statusCode,
      message: error.message
    });
  }

  // return createHttpResponse(500, null, error.message);
  return createHttpResponse(res, {
    status: 'status' in error ? error.status : 500,
    message: error.message,
    access
  });
}
