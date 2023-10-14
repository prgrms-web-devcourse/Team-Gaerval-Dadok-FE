import { IconCheckCircle, IconWarningCircle } from '@public/icons';
import { ToastOption } from './types';

const schemes = {
  success: {
    icon: <IconCheckCircle />,
    backgroundColor: 'bg-success-500',
    textColor: 'text-success-900',
    fillColor: 'fill-success-900',
  },
  error: {
    icon: <IconWarningCircle />,
    backgroundColor: 'bg-warning-500',
    textColor: 'text-warning-800',
    fillColor: 'fill-warning-800',
  },
  normal: {
    icon: null,
    backgroundColor: 'bg-black-500',
    textColor: 'text-white',
    fillColor: 'fill-white',
  },
} as const;

const ToastItem = ({ type = 'normal', message }: ToastOption) => {
  const scheme = schemes[type];

  return (
    <div
      className={`flex min-h-[5.3rem] w-full flex-row items-center gap-[1rem] rounded-full px-[2rem] ${scheme.backgroundColor}`}
    >
      {scheme.icon && (
        <div className={`h-[2rem] w-[2rem] ${scheme.fillColor}`}>
          {scheme.icon}
        </div>
      )}
      <p className={`text-sm ${scheme.textColor}`}>{message}</p>
    </div>
  );
};

export default ToastItem;
