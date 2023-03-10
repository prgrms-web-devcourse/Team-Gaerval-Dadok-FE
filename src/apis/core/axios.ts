import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import tokenStorage from '@/utils/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants';

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      if (typeof window !== 'undefined') {
        const token = tokenStorage(ACCESS_TOKEN_STORAGE_KEY).get();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      if (config.method === 'get' || config.method === 'delete') {
        config.data = {};
      }

      return config;
    },
    err => Promise.reject(err)
  );

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ECONNABORTED' || error.response?.status === 408) {
        ('');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const options: CreateAxiosDefaults = {
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
};

export const publicApi = setInterceptor(
  axios.create({
    ...options,
  })
);
