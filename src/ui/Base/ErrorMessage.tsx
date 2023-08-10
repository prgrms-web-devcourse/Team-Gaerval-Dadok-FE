import { IconWarningCircle } from '@public/icons';
import { ReactNode } from 'react';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-[0.4rem] text-xs text-warning-800">
      <div className="h-[1.2rem] w-[1.2rem]">
        <IconWarningCircle />
      </div>
      {children}
    </div>
  );
};

export default ErrorMessage;
