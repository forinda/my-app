import { AxiosError } from 'axios';
import { decodeArrayBuffer } from './decode-array-buffer';
import { TsFixMeType } from './types';

export function extractAxiosError(error: TsFixMeType) {
  if (error instanceof AxiosError) {
    return decodeArrayBuffer<
      AxiosError<{
        message: string;
      }>
    >(error.response?.data).message;
  }

  // if (error instanceof Error) {
  return error.message;
  // }
}
