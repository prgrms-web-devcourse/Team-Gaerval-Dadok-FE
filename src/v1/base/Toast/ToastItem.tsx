import { IconSuccess, IconWarning, IconError } from '@public/icons';
import { ToastOption } from './types';

const ICONS = {
  success: <IconSuccess />,
  error: <IconError />,
  normal: <IconWarning />,
} as const;

const ToastItem = ({ type = 'normal', message }: ToastOption) => {
  const icon = ICONS[type];

  return (
    <div
      className={`flex min-h-[5.3rem] w-full min-w-fit flex-row items-center gap-[1rem] rounded-full bg-black-500/[.98] px-[2rem] shadow-bookcover`}
    >
      {icon}
      <p className={`!leading-tight tracking-wide text-white font-body2-bold`}>
        {message}
      </p>
    </div>
  );
};

export default ToastItem;
