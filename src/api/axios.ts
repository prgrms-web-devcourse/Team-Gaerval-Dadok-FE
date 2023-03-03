import tokenStorage from '@/utils/storage';
import axios, { AxiosInstance } from 'axios';

type RequestType = 'JSON' | 'FILE';
const setInterceptor = (
  instance: AxiosInstance,
  type: RequestType = 'JSON'
) => {
  instance.interceptors.request.use(
    config => {
      if (typeof window !== 'undefined') {
        const token = tokenStorage('accessToken').get();
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      if (type === 'JSON') {
        config.data = {};
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    },
    err => Promise.reject(err)
  );

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ECONNABORTED' || error.response?.status === 408) {
        alert('요청이 만료되었습니다.');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const options = {
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
};

export const publicApi = setInterceptor(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    ...options,
  })
);
