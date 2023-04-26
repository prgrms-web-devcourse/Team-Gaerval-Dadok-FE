import { AxiosError, isAxiosError } from 'axios';

import { SERVICE_ERROR_MESSAGE } from '@/constants';
import { APIErrorResponseData } from '@/types/error';
import { RequiredWith } from '@/types/util';

import type { ServiceErrorCode } from '@/types/error';

const isAuthFailedError = (code: ServiceErrorCode) =>
  code === 'A1' ||
  code === 'A2' ||
  code === 'A3' ||
  code === 'A5' ||
  code === 'A7';

const isAuthRefreshError = (code: ServiceErrorCode) => code === 'A4';

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

export { isAuthFailedError, isAuthRefreshError, isAxiosErrorWithCustomCode };
