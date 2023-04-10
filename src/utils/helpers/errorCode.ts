import type { ServiceErrorCode } from '@/types/error';

const isAuthFailedError = (code: ServiceErrorCode) =>
  code === 'A1' ||
  code === 'A2' ||
  code === 'A3' ||
  code === 'A5' ||
  code === 'A7';

const isAuthRefreshError = (code: ServiceErrorCode) => code === 'A4';

export { isAuthFailedError, isAuthRefreshError };
