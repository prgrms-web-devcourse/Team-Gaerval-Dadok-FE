// ./src/stories/Button.js

import React, { ComponentPropsWithoutRef, useMemo } from 'react';

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'small': {
      return 'text-sm px-[1.2rem] py-[0.6rem]';
    }
    case 'medium': {
      return 'text-md px-[1.6rem] py-[0.8rem]';
    }
    case 'large': {
      return 'text-lg px-[2.4rem] py-[1rem]';
    }
    default: {
      // large
      return 'text-lg px-[2.4rem] py-[1rem]';
    }
  }
};

const getModeClasses = (isPrimary: boolean) =>
  isPrimary
    ? 'bg-main-900 text-white'
    : 'text-main-900 bg-white border-main-900';

const BASE_BUTTON_CLASSES =
  'cursor-pointer rounded-[0.5rem] border-[0.1rem] font-bold leading-none inline-block';

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'large',
  label,
  ...props
}: {
  primary: boolean;
  size: string;
  label: string;
} & ComponentPropsWithoutRef<'button'>) => {
  const computedClasses = useMemo(() => {
    const modeClass = getModeClasses(primary);
    const sizeClass = getSizeClasses(size);

    return [modeClass, sizeClass].join(' ');
  }, [primary, size]);

  return (
    <button
      type="button"
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      {...props}
    >
      {label}
    </button>
  );
};
