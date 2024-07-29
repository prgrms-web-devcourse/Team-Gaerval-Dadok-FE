'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { SESSION_COOKIES_KEYS } from '@/constants';
import { deleteCookie } from '@/utils/cookie';
import useToast from '@/components/common/Toast/useToast';
import QueryErrorBoundaryFallback from '@/components/common/QueryErrorBoundaryFallback';

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

const AuthFailedFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const { show: showToast } = useToast();

  const handleError = () => {
    SESSION_COOKIES_KEYS.map(key => deleteCookie(key));
    showToast({ message: '다시 로그인 해주세요' });
    resetErrorBoundary();
  };

  return <QueryErrorBoundaryFallback resetErrorBoundary={handleError} />;
};
