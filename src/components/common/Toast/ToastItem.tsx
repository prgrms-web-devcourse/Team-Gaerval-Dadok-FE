import type { ToastOption } from '@/components/common/Toast/types';

import { IconSuccess, IconWarning, IconError } from '@public/icons';

const ICONS = {
  success: <IconSuccess />,
  error: <IconError />,
  warning: <IconWarning />,
} as const;

const ToastItem = ({ type = 'warning', message }: ToastOption) => {
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
