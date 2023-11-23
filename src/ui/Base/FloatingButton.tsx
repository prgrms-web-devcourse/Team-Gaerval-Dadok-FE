import { IconPlus } from '@public/icons';
import { ComponentPropsWithoutRef } from 'react';
import { createPortal } from 'react-dom';

interface FloatingButtonProps extends ComponentPropsWithoutRef<'button'> {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const getPositionClasses = (position: string) => {
  switch (position) {
    case 'top-left': {
      return 'top-[6.4rem] left-[1.2rem]';
    }
    case 'top-right': {
      return 'top-[6.4rem] right-[1.2rem]';
    }
    case 'bottom-left': {
      return 'bottom-[7.2rem] left-[1.2rem]';
    }
    case 'bottom-right': {
      return 'bottom-[7.2rem] right-[1.2rem]';
    }
  }
};

const FloatingButton = ({ position, ...props }: FloatingButtonProps) => {
  const positionClasses = getPositionClasses(position);

  return createPortal(
    <button
      className={`${positionClasses} fixed left-[50%] top-[50%] flex h-[5.1rem] w-[5.1rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-main-900`}
      {...props}
    >
      <IconPlus />
    </button>,
    document.body
  );
};

export default FloatingButton;
