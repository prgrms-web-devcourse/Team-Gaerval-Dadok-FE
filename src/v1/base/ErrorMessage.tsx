import { ReactNode } from 'react';
import { IconErrorExclamation } from '@public/icons';

const ErrorMessage = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      {children && (
        <div className="flex items-center gap-[0.4rem] text-warning-800 font-caption1-regular">
          <div className="h-[1.2rem] w-[1.2rem]">
            <IconErrorExclamation />
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
