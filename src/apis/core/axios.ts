import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_STORAGE_KEY, SERVICE_ERROR_MESSAGE } from '@/constants';
import {
  isAuthFailedError,
  isAuthRefreshError,
  isAxiosErrorWithCustomCode,
} from '@/utils/helpers';
import isClient from '@/utils/isClient';
import webStorage from '@/utils/storage';

const storage = webStorage(ACCESS_TOKEN_STORAGE_KEY);
const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_HOST,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
};

export const publicApi = axios.create({
  ...options,
});

const requestHandler = (config: InternalAxiosRequestConfig) => {
  const { data, method } = config;
  const accessToken = storage.get();

  if (accessToken) {
    setAxiosAuthHeader(config, accessToken);
  }

  if (!data && (method === 'get' || method === 'delete')) {
    config.data = {};
  }

  return config;
};

/** api 요청이 병렬적으로 이뤄질 때,
 *  토큰 업데이트는 한번만 요청하기 위해 사용되는 flag 변수 */
let isRefreshing = false;

const responseHandler = async (error: unknown) => {
  if (isAxiosErrorWithCustomCode(error)) {
    const { config: originRequest, response } = error;
    const { code } = response.data;
    const message = SERVICE_ERROR_MESSAGE[code];

    console.warn(code, message);

    if (originRequest && isAuthRefreshError(code)) {
      return silentRefresh(originRequest);
    }

    if (isAuthFailedError(code)) {
      removeToken();
    }
  } else {
    console.error('예상하지 못한 오류가 발생했어요.\n', error);
  }

  return Promise.reject(error);
};

const silentRefresh = async (originRequest: InternalAxiosRequestConfig) => {
  try {
    if (isRefreshing) {
      return;
    }

    isRefreshing = true;

    const newToken = await updateToken();
    storage.set(newToken);
    setAxiosAuthHeader(originRequest, newToken);

    isRefreshing = false;

    return await publicApi(originRequest);
  } catch (error) {
    removeToken();
    isRefreshing = false;

    if (isClient()) {
      window.location.reload();
    }

    return Promise.reject(error);
  }
};

const updateToken = async () => {
  try {
    const {
      data: { accessToken },
    } = await axios.post<{ accessToken: string }>('/service-api/auth/token');

    if (!accessToken) {
      throw new Error('새로운 accessToken을 받아오지 못했어요.');
    }

    return accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

const removeToken = () => {
  storage.remove();
};

const setAxiosAuthHeader = (
  config: InternalAxiosRequestConfig,
  token: string
) => {
  config.headers['Authorization'] = `Bearers ${token}`;
};

publicApi.interceptors.request.use(requestHandler);
publicApi.interceptors.response.use(null, responseHandler);
