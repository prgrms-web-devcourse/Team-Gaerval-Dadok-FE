import { ComponentPropsWithoutRef } from 'react';

import { IconPlus } from '@public/icons';

import Portal from '@/v1/base/Portal';

interface FloatingButtonProps extends ComponentPropsWithoutRef<'button'> {
  position?: string;
  onClick?: () => void;
}

const FloatingButton = ({
  position,
  onClick,
  ...props
}: FloatingButtonProps) => {
  return (
    <Portal id="floating-button-root">
      <button
        className={`fixed ${position} flex h-[5.1rem] w-[5.1rem] items-center justify-center rounded-full bg-main-900 shadow-floating-button`}
        onClick={onClick}
        {...props}
      >
        <IconPlus className="fill-white" />
      </button>
    </Portal>
  );
};

export default FloatingButton;
