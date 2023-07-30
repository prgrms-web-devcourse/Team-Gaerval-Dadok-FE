import { IconWarningCircle } from '@public/icons';
import { ReactNode } from 'react';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-[0.4rem] text-xs text-warning-800">
      <IconWarningCircle />
      {children}
    </div>
  );
};

export default ErrorMessage;
