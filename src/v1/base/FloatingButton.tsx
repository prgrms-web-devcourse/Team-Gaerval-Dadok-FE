import { ComponentPropsWithoutRef } from 'react';

import { IconPlus } from '@public/icons';

import Portal from './Portal';

interface FloatingButtonProps extends ComponentPropsWithoutRef<'button'> {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClick?: () => void;
}

const getPositionClasses = (position: string) => {
  switch (position) {
    case 'top-left': {
      return 'top-[1.3rem] left-[1.7rem]';
    }
    case 'top-right': {
      return 'top-[1.3rem] right-[1.7rem]';
    }
    case 'bottom-left': {
      return 'bottom-[8.3rem] left-[1.7rem]';
    }
    case 'bottom-right': {
      return 'bottom-[8.3rem] right-[1.7rem]';
    }
  }
};

const FloatingButton = ({
  position,
  onClick,
  ...props
}: FloatingButtonProps) => {
  const positionClasses = getPositionClasses(position);

  return (
    <Portal id="floating-button-portal">
      <button
        className={`${positionClasses} absolute flex h-[5.1rem] w-[5.1rem] items-center justify-center rounded-full bg-main-900 shadow-floating-button`}
        onClick={onClick}
        {...props}
      >
        <IconPlus className="fill-white" />
      </button>
    </Portal>
  );
};

export default FloatingButton;
