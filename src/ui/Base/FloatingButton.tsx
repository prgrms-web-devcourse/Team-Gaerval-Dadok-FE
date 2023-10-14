import { IconPlus } from '@public/icons';
import { ComponentProps } from 'react';
import { createPortal } from 'react-dom';

interface FloatingButtonProps extends ComponentProps<'button'> {
  position: 'lt' | 'rt' | 'lb' | 'rb';
}

const getPositionClasses = (position: string) => {
  switch (position) {
    case 'lt': {
      return 'left-[1.2rem] top-[6.4rem]';
    }
    case 'rt': {
      return 'right-[1.2rem] top-[6.4rem]';
    }
    case 'lb': {
      return 'left-[1.2rem] bottom-[7.2rem]';
    }
    case 'rb': {
      return 'right-[1.2rem] bottom-[7.2rem]';
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
