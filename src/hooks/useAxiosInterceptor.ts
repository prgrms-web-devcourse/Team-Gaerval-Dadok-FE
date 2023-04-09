import {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { useEffect } from 'react';

import type { APIErrorResponseData } from '@/types/error';
import type { RequiredWith } from '@/types/util';

import { publicApi } from '@/apis/core/axios';
import { SERVICE_ERROR_MESSAGE } from '@/constants';
import { useAuth } from '@/hooks/auth';
import {
  isAuthFailedError,
  isAuthRefreshError,
  setAxiosAuthHeader,
  updateToken,
} from '@/utils/helpers';

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const { accessToken, setAuth, removeAuth } = useAuth();

  const requestHandler = (config: InternalAxiosRequestConfig) => {
    const { data, method } = config;

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
        removeAuth();
      }
    }

    console.error('예상하지 못한 오류가 발생했어요.\n', String(error));
    return Promise.reject(error);
  };

  const silentRefresh = (originRequest: InternalAxiosRequestConfig) => {
    return updateToken().then(newToken => {
      setAuth(newToken);
      setAxiosAuthHeader(originRequest, newToken);
      return publicApi(originRequest);
    });
  };

  const requestInterceptor = instance.interceptors.request.use(requestHandler);
  const responseInterceptor = instance.interceptors.response.use(null, error =>
    responseHandler(error)
  );

  useEffect(() => {
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [instance, requestInterceptor, responseInterceptor]);
};

/**  axios 에러 응답에 custom error code가 포함되어 있는지 확인하며, 이를 보장하는 타입 가드 함수입니다. */
const isAxiosErrorWithCustomCode = (
  error: unknown
): error is RequiredWith<AxiosError<APIErrorResponseData>, 'response'> => {
  return (
    error !== null &&
    isAxiosError<APIErrorResponseData>(error) &&
    !!error.response &&
    !!error.response.data.code &&
    error.response.data.code in SERVICE_ERROR_MESSAGE
  );
};

export default useAxiosInterceptor;
