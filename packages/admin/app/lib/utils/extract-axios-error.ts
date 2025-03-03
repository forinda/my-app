import { AxiosError } from 'axios';
import { decodeArrayBuffer } from './decode-array-buffer';

export function extractAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    return decodeArrayBuffer<
      AxiosError<{
        message: string;
      }>
    >(error.response?.data).message;
  }

  if (error instanceof Error) {
    return error.message;
  }
}
