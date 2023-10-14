import { IconPlus } from '@public/icons';
import { ComponentProps } from 'react';

const FloatingButton = ({ ...props }: ComponentProps<'button'>) => {
  return (
    <button
      className="flex h-[5.1rem] w-[5.1rem] items-center justify-center rounded-full bg-main-900"
      {...props}
    >
      <IconPlus />
    </button>
  );
};

export default FloatingButton;
