import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toastError(error: any) {
  if (error instanceof AxiosError) {
    const message = error.response?.data.message || error.message;
    toast.error(message, {
      className: 'bg-red-500 text-white',
      position: 'top-right',
    });
  } else {
    toast.error(error.message, {
      className: 'bg-red-500 text-white',
      position: 'top-right',
    });
  }
}

export function toastSuccess(message: string) {
  toast.success(message, {
    className: 'bg-green-500 text-white',
    position: 'top-right',
  });
}
