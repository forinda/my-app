import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5050/api/v1',
});

export default apiClient;
