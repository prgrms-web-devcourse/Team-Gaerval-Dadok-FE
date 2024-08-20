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
      className={`absolute flex h-[5.1rem] w-[5.1rem] items-center justify-center rounded-full bg-main-900 ${positionClasses}`}
      {...props}
    >
      <IconPlus />
    </button>,
    document.body
  );
};

export default FloatingButton;
