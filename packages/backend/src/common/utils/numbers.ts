import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';

export function isNumber(value: unknown): boolean {
  if (typeof value === 'number' && !isNaN(value) && Number.isFinite(value)) {
    return true; // Check for actual numbers
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const num = Number(value); // Convert the string to a number

    return !isNaN(num) && Number.isFinite(num); // Ensure the conversion resulted in a finite number
  }

  return false;
}

export const convertToNumber = (
  value: unknown,
  type: 'float' | 'int' = 'int'
): number => {
  if (!isNumber(value)) {
    throw new ApiError('Invalid number value', HttpStatus.BAD_REQUEST, {
      status: 'error',
      reason: `Invalid number value: ${value}, and type: ${typeof value}`
    });
  }

  return type === 'int'
    ? parseInt(value as string, 10)
    : parseFloat(value as string);
};
