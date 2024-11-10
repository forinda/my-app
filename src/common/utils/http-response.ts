import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';

// type Options = {
//   statusCode?: number;
//   message?: string;
//   status?: 'success' | 'error' | 'warning';
// };

export function createHttpSuccessResponse<T = unknown>(
  data: T,
  statusCode = HttpStatus.OK,
  message = 'Success'
) {
  return {
    status: 'success',
    statusCode,
    message,
    data
  };
}

export function createHttpErrorResponse(
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  message = 'An unexpected error occurred'
) {
  throw new ApiError(message, statusCode, {
    status: 'error',
    reason: message
  });
}
