import { ReactNode } from 'react';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <div className="text-warning-800">{children}</div>;
};

export default ErrorMessage;
