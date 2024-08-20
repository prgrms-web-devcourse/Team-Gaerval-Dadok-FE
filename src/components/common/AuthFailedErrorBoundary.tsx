'use client';

import { useEffect } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
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

const AuthFailedFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { show: showToast } = useToast();

  useEffect(() => {
    showToast({ message: '다시 로그인 해주세요' });
  }, [error, showToast]);

  return <QueryErrorBoundaryFallback resetErrorBoundary={resetErrorBoundary} />;
};
