import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_STORAGE_KEY, SERVICE_ERROR_MESSAGE } from '@/constants';
import {
  isAuthFailedError,
  isAuthRefreshError,
  isAxiosErrorWithCustomCode,
  setAxiosAuthHeader,
  updateToken,
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
      storage.remove();
      if (isClient()) {
        history.pushState('', '', '/');
      }
    }
  } else {
    console.error('예상하지 못한 오류가 발생했어요.\n', error);
  }

  return Promise.reject(error);
};

const silentRefresh = (originRequest: InternalAxiosRequestConfig) => {
  return updateToken().then(newToken => {
    storage.set(newToken);
    setAxiosAuthHeader(originRequest, newToken);
    return publicApi(originRequest);
  });
};

publicApi.interceptors.request.use(requestHandler);
publicApi.interceptors.response.use(null, responseHandler);
