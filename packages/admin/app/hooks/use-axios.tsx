import axios from 'axios';

export function useAxios() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL as string;
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    responseType: 'arraybuffer',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

    withCredentials: true,
  });
  return axiosInstance;
}
