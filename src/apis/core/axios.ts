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
        if (error.response && error.response.data) {
          const {
            status,
            code,
            message: _message,
          } = error.response.data as APIErrorResponse;
          console.log(code, error.response.data);

          const toastMessage = ERROR_MESSAGE[status]?.[code];
          console.warn(status, code, toastMessage);
          if (
            code === 'A1' ||
            code === 'A2' ||
            code === 'A3' ||
            code === 'A5' ||
            code === 'A7'
          ) {
            // 다시 로그인
            window.location.href = '/login';
            storage.remove();
            return Promise.reject(error);
          }

          if (code === 'A4') {
            try {
              const response = await axios.post('/service-api/auth/token');
              const token = response.data.accessToken;
              if (token && error.config) {
                error.config.headers['Authorization'] = `Bearers ${token}`;
                storage.set(token);
                return publicApi(error.config);
              }
            } catch (error) {
              window.location.replace('/login');
              return Promise.reject(error);
            }
          }
          return Promise.reject(error);
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

export const publicApi = axios.create({
  ...options,
});

setInterceptor(publicApi);
