'use client';

import { useEffect } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import useToast from '@/v1/base/Toast/useToast';
import { isAuthFailedError, isAxiosErrorWithCustomCode } from '@/utils/helpers';
import Loading from '@/v1/base/Loading';

const AuthFailedErrorBoundary = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={AuthFailedFallback}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default AuthFailedErrorBoundary;

const AuthFailedFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { show: showToast } = useToast();

  useEffect(() => {
    if (
      isAxiosErrorWithCustomCode(error) &&
      isAuthFailedError(error.response.data.code)
    ) {
      showToast({ message: '다시 로그인 해주세요' });
      resetErrorBoundary();
    }
  }, [error, resetErrorBoundary, showToast]);

  useEffect(() => {
    console.log(showToast);
  }, [showToast]);

  return <Loading fullpage />;
};
