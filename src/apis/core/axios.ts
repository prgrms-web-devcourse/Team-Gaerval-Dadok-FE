import axios, {
  AxiosError,
  AxiosInstance,
  CreateAxiosDefaults,
  isAxiosError,
} from 'axios';

import tokenStorage from '@/utils/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants/storage';
import { APIErrorResponse, ERROR_MESSAGE } from '@/constants';
AxiosError;
const storage = tokenStorage(ACCESS_TOKEN_STORAGE_KEY);

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      if (typeof window !== 'undefined') {
        const token = tokenStorage(ACCESS_TOKEN_STORAGE_KEY).get();

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      if (
        !config.data &&
        (config.method === 'get' || config.method === 'delete')
      ) {
        config.data = {};
      }

      return config;
    },
    err => Promise.reject(err)
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.body) {
          console.log(error);
          const {
            status,
            code,
            message: _message,
          } = error.response.data.body as APIErrorResponse;
          const toastMessage = ERROR_MESSAGE[status]?.[code];
          console.warn(status, code, toastMessage);

          if (code === 'A1' || code === 'A2' || code === 'A5') {
            // 다시 로그인
            storage.remove();
            window.location.replace('/login');
            return;
          }

          if (code === 'A3' || code === 'A4') {
            // refresh 요청
            const response = await publicApi.post('/service-api/auth/token');
            const token = response.headers['Authorization'].split(' ')[1];

            if (typeof window !== 'undefined' && token && error.config) {
              error.config.headers['Authorization'] = `Bearers ${token}`;
              return await publicApi.request(error.config);
            }
          }

          return;
          // return { isError: true, message: toastMessage ?? message, error };
        }
      }
      console.error(error);
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
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })
);
