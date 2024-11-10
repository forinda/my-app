import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';

function isNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value) && Number.isFinite(value);
}

export const convertToNumber = (value: unknown): number => {
  if (!isNumber(value)) {
    throw new ApiError('Invalid number value', HttpStatus.BAD_REQUEST, {
      status: 'error',
      reason: `Invalid number value: ${value}, and type: ${typeof value}`
    });
  }

  return value as number;
};
