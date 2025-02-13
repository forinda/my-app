import axios from 'axios'

export function useAxios() {
  const BASE_URL = import.meta.env.VITE_APP_API_URL as string
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },

    // withCredentials: true,
  })
  return axiosInstance
}
